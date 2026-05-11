# API Gateway — Tổng quan kiến trúc

> Mô tả toàn bộ những gì API Gateway hiện tại có, vai trò của từng thành phần, và cách nó phối hợp với phần còn lại của hệ thống.

---

## 1. Vai trò trong hệ thống

API Gateway là **cổng vào duy nhất** của toàn bộ backend. Frontend (Next.js) chỉ giao tiếp với `http://localhost:8080` (dev) và **không bao giờ gọi thẳng** vào port của từng service.

```
Frontend (Next.js :3000)
        │
        ▼
  API Gateway :8080          ← điểm vào duy nhất
        │
        ├──► auth-service :8081
        ├──► user-service :8082
        ├──► exam-service :8084
        └──► material-service :8083
```

Gateway không có database, không có business logic — chỉ route, filter và bảo vệ downstream.

---

## 2. Stack kỹ thuật

| Thành phần | Chi tiết |
|------------|----------|
| Framework | Spring Cloud Gateway (WebFlux — non-blocking reactive) |
| Spring Boot | 3.5.13 |
| Spring Cloud | 2025.0.1 |
| Java | 21 |
| Service Discovery | Spring Cloud Netflix Eureka Client |
| Load Balancer | Spring Cloud LoadBalancer (tích hợp sẵn) |
| Circuit Breaker | Resilience4j (Reactor adapter) |
| Port | 8080 |

---

## 3. Routing

| Route ID | Path predicate | Upstream service | Eureka name |
|----------|----------------|------------------|-------------|
| `auth_service` | `/api/auth/**` | `lb://auth-service` | `auth-service` |
| `user_service` | `/api/users/**` | `lb://user-service` | `user-service` |
| `exam_service` | `/api/exams/**`, `/api/categories/**`, `/api/attempts/**` | `lb://exam-service` | `exam-service` |
| `material_service` | `/api/materials/**` | `lb://material-service` | `material-service` |

`lb://` prefix → Spring Cloud LoadBalancer tra cứu instance từ Eureka và cân bằng tải tự động (round-robin mặc định). Không hardcode host/port.

---

## 4. Global Filters (thứ tự thực thi)

### 4.1 LoggingFilter — `Order: HIGHEST_PRECEDENCE`

Chạy **đầu tiên** trong toàn bộ filter chain.

- Sinh `X-Request-Id` (12 ký tự hex) cho mỗi request.
- Forward `X-Request-Id` xuống downstream service qua header — dùng để trace log xuyên suốt các service.
- **Strip `Accept-Encoding` header** trước khi forward xuống upstream — ngăn upstream nén response bằng gzip. Gateway tự xử lý nén phía client qua `server.compression`. Nếu không strip, `ResponseWrapperFilter` sẽ nhận bytes gzip, parse JSON thất bại.
- Ghi `startTime` vào exchange attribute để `ResponseWrapperFilter` tính `responseTime`.
- Log inbound: `[requestId] --> METHOD /path`
- Log outbound: `[requestId] <-- STATUS /path Xms`

Ví dụ log:
```
[a3f9c12b4e1d] --> POST /api/auth/login
[a3f9c12b4e1d] <-- 200 /api/auth/login 47ms
```

### 4.2 SecurityHeadersFilter — `Order: HIGHEST_PRECEDENCE + 1`

Tự động inject security headers vào **mọi response** trước khi trả về FE.  
Dùng `response.beforeCommit()` để đảm bảo header được set đúng thời điểm, không bị ghi đè bởi downstream.

| Header | Giá trị | Mục đích |
|--------|---------|---------|
| `X-Content-Type-Options` | `nosniff` | Chặn browser tự đoán MIME type |
| `X-Frame-Options` | `DENY` | Chặn clickjacking qua iframe |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Giới hạn thông tin referrer |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` | Tắt quyền browser nhạy cảm |

### 4.3 ResponseWrapperFilter — `Order: HIGHEST_PRECEDENCE + 2`

Bọc **mọi JSON response** từ upstream thành format chuẩn thống nhất cho toàn hệ thống. Thay thế `GlobalResponseInterceptor` trước đây ở từng service.

**Format output:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "OK",
  "data": { ... },
  "path": "/api/auth/login",
  "timestamp": "2026-05-11T10:00:00Z",
  "responseTime": "47 ms"
}
```

**Logic:**
- Bỏ qua path `/actuator/**` và `/fallback/**` — không bọc.
- Chỉ bọc response có `Content-Type: application/json`.
- Với response thành công (status < 400): đọc `message` và `data` từ body gốc.
- Với response lỗi (status ≥ 400): set `data: null`, lấy `message` từ body gốc.
- Xóa header `Transfer-Encoding` và set `Content-Length` chính xác sau khi bọc.
- Ghi đè cả `writeWith()` và `writeAndFlushWith()` để bắt mọi cách upstream ghi response.
- `onErrorResume` — nếu có lỗi reactive trong quá trình bọc, fallback về Mono.empty() thay vì propagate lên CircuitBreaker.

---

## 5. CORS — Tập trung tại Gateway

CORS được xử lý **một lần duy nhất** tại gateway thông qua `CorsWebFilter` bean.

- Allowed Origins: cấu hình theo profile (dev: localhost:3000/3001, prod: env var `ALLOWED_ORIGINS`).
- Allowed Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS.
- Allowed Headers: `*`
- `allowCredentials: true` (cần thiết để browser gửi cookie httpOnly).
- `maxAge: 3600s` — browser cache CORS preflight.

> Các service downstream **không cần** và **không nên** tự cấu hình CORS. `material_service` hiện đang có `CorsConfig` riêng — nên xóa để tránh conflict.

---

## 6. Circuit Breaker + Fallback

Mỗi route đều có CircuitBreaker riêng với cấu hình shared:

| Tham số | Giá trị | Ý nghĩa |
|---------|---------|---------|
| `sliding-window-size` | 20 | Tính failure rate trên 20 call gần nhất |
| `minimum-number-of-calls` | 10 | Cần ít nhất 10 call mới kích hoạt circuit logic |
| `failure-rate-threshold` | 60% | Mở circuit khi ≥60% request thất bại |
| `slow-call-rate-threshold` | 80% | Mở circuit khi ≥80% call bị xem là chậm |
| `slow-call-duration-threshold` | 15s | Call > 15s bị đánh dấu là chậm |
| `wait-duration-in-open-state` | 15s | Giữ circuit OPEN trong 15s trước khi thử lại |
| `permitted-calls-in-half-open` | 5 | Cho phép 5 call thử khi HALF_OPEN |
| Auto transition OPEN→HALF_OPEN | true | Tự động, không cần trigger thủ công |

**Record exceptions** (chỉ các exception này mới tính là failure):
- `java.io.IOException`
- `java.util.concurrent.TimeoutException`
- `org.springframework.cloud.gateway.support.NotFoundException`

**Vòng đời circuit:**
```
CLOSED ──(≥60% fail trong 20 calls)──► OPEN (503 toàn bộ)
                                            │
                                        (sau 15s)
                                            ▼
                                       HALF_OPEN ──(5 test calls pass)──► CLOSED
                                            │
                                     (test calls fail)
                                            ▼
                                          OPEN
```

Khi circuit OPEN → gateway forward đến `FallbackController` → FE nhận HTTP 503 JSON có cấu trúc thay vì lỗi 500 mặc định:

```json
{
  "success": false,
  "statusCode": 503,
  "message": "Dịch vụ tạm thời không khả dụng, vui lòng thử lại sau",
  "path": "/api/exams/1",
  "timestamp": "2026-05-11T00:00:00Z"
}
```

---

## 7. Retry

| Route | Retry | Điều kiện | Backoff |
|-------|-------|-----------|---------|
| auth, user, exam | 2 lần | GET + 503 only | 200ms → 1000ms (×2) |
| material | Không retry | — | — |

Chỉ retry GET để tránh side-effect (POST/PUT/DELETE không idempotent). Chỉ retry khi 503 (service chưa lên) — không retry lỗi 4xx hay 500 từ business logic. Material không retry vì file download có thể bị duplicate byte stream.

---

## 8. Timeout

| Scope | Giá trị | Ghi chú |
|-------|---------|---------|
| Gateway → upstream TCP connect | 5000ms | Thời gian thiết lập kết nối |
| Global response timeout | 30s | Fallback cho route chưa có per-route |
| auth-service (per-route) | 12s | 8s Hikari cold start + 2s query + 2s buffer |
| user-service (per-route) | 12s | Như auth |
| exam-service (per-route) | 25s | Thêm buffer cho query phức tạp, batch |
| material-service (per-route) | 60s | Serve file PDF lớn |

**Chuỗi timeout (phải thỏa mãn: DB timeout < Service timeout < Gateway timeout):**
```
Neon cold start (~5s max)
  └─► Hikari connection-timeout: 8s          ← fail nhanh nếu DB thực sự chết
        └─► Service total response: ~10s
              └─► Gateway per-route: 12s     ← luôn > Hikari timeout
                    └─► Circuit breaker slow: 15s
```

Per-route timeout ghi đè global timeout. Material được nới lỏng vì serve file PDF lớn.

---

## 9. Actuator Endpoints

| Endpoint | Mục đích |
|----------|---------|
| `GET /actuator/health` | Healthcheck (dùng cho Docker healthcheck) |
| `GET /actuator/info` | Thông tin app (version, name) |
| `GET /actuator/gateway/routes` | Xem toàn bộ route đang active |
| `GET /actuator/gateway/globalfilters` | Xem filter đang chạy |

---

## 10. Service Discovery & Load Balancing

Gateway đăng ký vào Eureka và fetch registry mỗi 10s. Khi route đến `lb://auth-service`, LoadBalancer:
1. Tra danh sách instance của `auth-service` trong Eureka.
2. Chọn instance theo round-robin.
3. Forward request đến instance đó.

Nếu instance nào không heartbeat đúng hạn (lease expiration 30s), Eureka loại khỏi danh sách → LoadBalancer không route đến nữa.

---

## 11. Cấu hình theo môi trường

| Config key | Dev | Prod |
|------------|-----|------|
| `cors.allowed-origins` | localhost:3000, :3001 | `${ALLOWED_ORIGINS}` (env) |
| `eureka.defaultZone` | `http://localhost:8761/eureka/` | `${EUREKA_URL}` (env) |
| `health.show-details` | always | when-authorized |

---

## 12. Tương thích với Discovery Server (Eureka)

| | API Gateway | Discovery Server |
|-|-------------|-----------------|
| Spring Boot | 3.5.13 | 4.0.5 |
| Spring Cloud | 2025.0.1 | 2025.1.1 |

**Kết luận: tương thích.** Eureka REST protocol backward-compatible giữa các phiên bản Spring Cloud. Client 2025.0.1 đăng ký với Server 2025.1.1 hoạt động bình thường. Đây là pattern phổ biến trong rolling upgrade.

**Vấn đề cần lưu ý (không ảnh hưởng Gateway, nhưng cần sửa):**

1. `discovery_server/application.yaml` không có `management` config tường minh — actuator health vẫn expose mặc định ở Spring Boot 4.x, healthcheck trong docker-compose vẫn pass.

2. `docker-compose.yml` — các service `auth_service`, `user_service`, `exam-service`, `material_service` **thiếu khai báo `networks: - be-network`**. Chúng nằm trên `default` network, không giao tiếp được với `discovery_server` và `api_gateway` (đang ở `be-network`). Cần thêm `networks: - be-network` cho từng service.

---

## 13. Những gì Gateway CHƯA làm (roadmap)

| Tính năng | Trạng thái | Ghi chú |
|-----------|------------|---------|
| JWT verification tập trung | Chưa có | Hiện mỗi service tự verify. Centralize ở đây sẽ loại bỏ duplicate code |
| Rate limiting | Chưa có | Cần Redis. Thêm `RequestRateLimiter` filter khi có Redis |
| Request size limit | Chưa có | Thêm `RequestSize` filter để chặn payload quá lớn |
| Tracing (OpenTelemetry) | Chưa có | `X-Request-Id` đã có, cần thêm Micrometer Tracing để correlate với Zipkin/Jaeger |
| Authentication endpoint whitelist | Chưa có | Phụ thuộc vào JWT centralization |
