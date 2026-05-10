# Auth Service Latency Analysis

> Ngày phân tích: 2026-05-08  
> Triệu chứng: `POST /api/auth/login` đo được 2–5s, cá biệt hơn với `POST /api/auth/register`  
> Baseline hệ thống: request trung bình các service khác ~300ms

---

## Tóm tắt

Auth-service chậm không phải do 1 nguyên nhân mà là **tổng của 4 vấn đề cộng dồn**. Tệ nhất là login đang thực hiện một Feign call sang user-service **hoàn toàn thừa** — đây là nguyên nhân chính gây ra con số 2–5s khi user-service đang bận hoặc cold.

---

## Vấn đề 1: Login gọi Feign sang user-service — không cần thiết

### Vấn đề
`AuthService.login()` (line 57) sau khi verify BCrypt thành công, thực hiện:
```java
userServiceClient.getUser(userId)  // GET /api/users/{id}
```
Mục đích: "verify user còn tồn tại".

### Tại sao thừa
Bảng `credentials` chứa `(email, bcrypt_password, user_id)`. Credential chỉ được tạo trong flow `register()` — sau khi user-service tạo user thành công. Nếu credential tồn tại và password đúng, user **chắc chắn đã tồn tại** tại thời điểm tạo credential.

Trường hợp duy nhất cần check lại: admin xóa user nhưng không xóa credential. Đây là edge case hiếm, không nên đặt trên hot path của mọi login request.

### Hậu quả
- Mỗi lần login = 1 round-trip nội bộ qua Eureka → user-service → Neon DB.
- Neon DB ở `ap-southeast-1` (Singapore) → roundtrip từ server ~50–150ms chỉ riêng network.
- Nếu user-service đang khởi động hoặc Hikari pool đang đầy → auth-service block chờ, có thể lên đến **60 giây** (default Feign read timeout).
- Latency login = BCrypt + Feign roundtrip + user-service DB query = **300–700ms** thay vì chỉ cần ~150ms.

### Hướng giải quyết
**Xóa Feign call `getUser()` khỏi `login()`**. JWT chỉ cần `userId` làm subject — đã có trong credential. Flow login sẽ là:
```
1. Tìm credential theo email          → local DB (auth_db)
2. BCrypt.matches(password, hash)     → CPU, ~100–300ms
3. Tạo JWT với subject = userId       → ~1ms
4. Set httpOnly cookie                → xong
```
Không cần biết tên user, không cần gọi user-service.

---

## Vấn đề 2: Feign dùng HTTP client mặc định — không có connection pool

### Vấn đề
Feign mặc định trong Spring Cloud dùng `java.net.HttpURLConnection` làm HTTP client. Client này:
- **Không có connection pool** — mỗi Feign call tạo 1 TCP connection mới từ đầu.
- **Không có keep-alive** — connection đóng ngay sau mỗi response.

### Hậu quả
Mỗi lần `register()` gọi `createUser()` sang user-service, sequence là:
```
TCP SYN → SYN-ACK → ACK (3-way handshake)  ~1–5ms trong Docker network
HTTP Request → Response
Connection đóng
```
Với môi trường Docker (loopback/bridge), overhead ~1–5ms. Nhưng nếu service chạy trên các host khác nhau (cloud), có thể là 20–100ms mỗi lần connect.

Quan trọng hơn: **không có retry circuit** — nếu connection bị từ chối (user-service busy), Feign trả lỗi ngay thay vì dùng connection đang có sẵn trong pool.

### Hướng giải quyết
Thêm dependency `feign-hc5` (Apache HttpClient 5) vào `auth_service/pom.xml`:
```xml
<dependency>
    <groupId>io.github.openfeign</groupId>
    <artifactId>feign-hc5</artifactId>
</dependency>
```
Spring Cloud OpenFeign tự detect và dùng `ApacheHttp5Client` khi có dependency này — connection pool bật tự động, keep-alive được tái sử dụng.

---

## Vấn đề 3: Không có timeout cho Feign — có thể treo 60 giây

### Vấn đề
Không có bất kỳ cấu hình timeout nào trong `application.yaml` hoặc `FeignConfig`. Spring Cloud Feign dùng mặc định:
- `connectTimeout: 2000ms` (2 giây kết nối)
- `readTimeout: 60000ms` (60 giây chờ response)

### Hậu quả
Nếu user-service đang khởi động, overloaded, hoặc bị crash:
- `register()` → gọi `createUser()` → **block 60 giây** trước khi throw exception.
- Tất cả thread xử lý request của auth-service bị block → **thread pool exhaustion** → các request login khác cũng bị block theo.
- Cascading failure: auth-service chết theo user-service dù auth-service hoàn toàn healthy.

### Hướng giải quyết
Thêm vào `auth_service/application.yaml`:
```yaml
feign:
  client:
    config:
      default:
        connectTimeout: 2000
        readTimeout: 5000
  circuitbreaker:
    enabled: true
```
Với `readTimeout: 5000ms`, auth-service fail-fast sau 5 giây thay vì 60 giây. Phối hợp với Resilience4j circuit breaker (Phase 3) để tự động ngắt khi user-service liên tục fail.

---

## Vấn đề 4: BCrypt strength=10 (default) chiếm 100–300ms blocking

### Vấn đề
`SecurityConfig.java:29` khai báo `new BCryptPasswordEncoder()` — không truyền strength → mặc định **strength = 10**.

BCrypt strength 10 trên CPU hiện đại mất khoảng:
- CPU tốt (server): ~100ms
- CPU yếu (cloud free tier): ~200–300ms

Trong Spring MVC (thread-per-request), BCrypt block toàn bộ luồng request trong suốt thời gian hash.

### Hậu quả
- Mỗi login phải chờ BCrypt trước khi làm bất cứ điều gì khác.
- Với 10 request login đồng thời → 10 thread bị block ~200ms mỗi thread = thread pool stress.
- Tổng latency login = BCrypt (~200ms) + Feign call (~200–500ms) → **400–700ms** trong case thường.

### Hướng giải quyết — 2 lựa chọn

**Option A: Giảm strength xuống 8** (nhanh hơn ~4x)
```java
new BCryptPasswordEncoder(8)  // ~25–75ms thay vì 100–300ms
```
Trade-off: giảm thời gian brute-force từ "vài năm" xuống "vài tháng" — vẫn hoàn toàn secure cho hầu hết use case thực tế. OWASP khuyến nghị strength ≥ 10 cho hệ thống high-security, strength 8–9 vẫn acceptable cho web app bình thường.

**Option B: Giữ strength=10 nhưng chạy async** (không trade-off security)
```java
@Async("bcryptExecutor")
public CompletableFuture<Boolean> verifyPasswordAsync(String raw, String encoded) {
    return CompletableFuture.completedFuture(encoder.matches(raw, encoded));
}
```
Phức tạp hơn vì cần cấu hình `ThreadPoolTaskExecutor` riêng, nhưng không giải phóng thread của Tomcat mà chỉ chuyển sang thread pool khác — ít lợi hơn tưởng.

**Khuyến nghị**: Option A (strength=8) cho project này. Hệ thống học tập/thi cử không phải high-security target.

---

## Ước tính latency sau khi fix

| Thành phần | Trước | Sau fix |
|------------|-------|---------|
| BCrypt verify (strength 8) | ~200ms | ~50ms |
| Feign call getUser (bỏ) | ~200–5000ms | **0ms** |
| Local DB query credential | ~50ms | ~50ms |
| JWT tạo + set cookie | ~1ms | ~1ms |
| **Tổng login** | **450ms – 5s+** | **~100ms** |

| Thành phần | Trước | Sau fix |
|------------|-------|---------|
| Feign createUser (có pool) | ~200ms | ~50ms |
| Local DB save credential | ~50ms | ~50ms |
| **Tổng register** | **~500ms** | **~150ms** |

---

## Thứ tự ưu tiên fix

| Ưu tiên | Action | Impact | Effort |
|---------|--------|--------|--------|
| 🔴 1 | Xóa `getUser()` Feign call khỏi `login()` | Giảm 200ms–5s | 5 dòng code |
| 🔴 2 | Thêm Feign timeout config | Prevent 60s hang | 6 dòng yaml |
| 🟡 3 | Thêm `feign-hc5` connection pool | Giảm 50–150ms register | 1 dependency |
| 🟡 4 | Giảm BCrypt strength 10→8 | Giảm 150ms | 1 dòng code |

Ưu tiên 1 và 2 có thể fix trong 10 phút, impact lớn nhất.

---

## Lưu ý khi xóa Feign call trong login

Sau khi xóa `getUser()`, cần xử lý case edge: **user bị xóa trong user-service nhưng credential vẫn còn trong auth_db**. Hiện tại không có cơ chế đồng bộ xóa. Giải pháp đơn giản nhất: khi `deleteUser()` ở user-service được gọi, emit event (hoặc gọi API) sang auth-service để xóa credential tương ứng. Việc này nằm ngoài scope Phase 1 và Phase 2 — ghi nhận là **Known Issue #11**.
