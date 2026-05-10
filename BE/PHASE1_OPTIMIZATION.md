# Phase 1 — API Performance Optimization

> Ngày thực hiện: 2026-05-08  
> Branch: `feature/material-service`  
> Scope: Tất cả service trong BE mono-repo

---

## 1. Vấn đề: `show-sql` + `format_sql` bật ở môi trường production

### Vấn đề
Cả 4 service (`exam-service`, `material_service`, `auth_service`, `user_service`) đều đang cấu hình:
```yaml
jpa:
  show-sql: true
  properties:
    hibernate:
      format_sql: true
```

### Hậu quả
- Mỗi câu SQL được in ra stdout với định dạng multi-line đẹp → **I/O blocking** trên luồng xử lý request.
- Với `exam-service` có thể fire 20–50 query/request (do N+1), log này làm tăng latency trực tiếp.
- Trong môi trường Docker/cloud, stdout được ghi vào log driver → càng chậm hơn.
- Không thể tắt runtime; phải restart service mới hết.

### Cách sửa
Tắt `show-sql: false` và xóa `format_sql` ở **tất cả 4 service**. Nếu cần debug SQL trong dev, dùng `logging.level.org.hibernate.SQL: DEBUG` trong profile riêng thay vì bật toàn cầu.

---

## 2. Vấn đề: Hikari connection pool quá nhỏ

### Vấn đề
Tất cả service đặt `maximum-pool-size: 5`, `minimum-idle: 1`, không cấu hình `max-lifetime` và `keepalive-time`.

### Hậu quả
- **Pool saturation**: Neon serverless dùng PgBouncer pooler. Với 5 connection dùng chung cho mọi request đồng thời, khi có >5 request chờ DB sẽ queue ở tầng Hikari → latency tăng đột biến.
- **Stale connections**: Neon drop idle connection sau ~5 phút. Hikari mặc định `max-lifetime: 30 phút` → connection trong pool bị Neon đóng nhưng Hikari vẫn nghĩ còn sống → `Connection is closed` error khi traffic thấp và pool không active.

### Cách sửa
Cập nhật Hikari ở tất cả service:
```yaml
hikari:
  maximum-pool-size: 10    # 5 service × 10 = 50 max, trong Neon free tier cho phép
  minimum-idle: 2
  connection-timeout: 20000
  max-lifetime: 600000     # 10 phút — dưới ngưỡng Neon drop idle (~5 phút thực tế cộng buffer)
  keepalive-time: 60000    # Gửi keepalive mỗi 1 phút để Neon không drop idle connection
```

---

## 3. Vấn đề: Không bật HTTP response compression (gzip)

### Vấn đề
Không có `server.compression` trong bất kỳ service nào.

### Hậu quả
- Response JSON từ `GET /api/exams` (danh sách đề thi) hoặc `GET /api/exams/{id}` (kèm questions) có thể nặng 20–100KB.
- Không nén → browser và mobile nhận raw JSON, tốn bandwidth, tăng time-to-first-byte.
- Đặc biệt nghiêm trọng khi client ở mạng chậm hoặc dùng mobile.

### Cách sửa
Bật compression ở tất cả service:
```yaml
server:
  compression:
    enabled: true
    mime-types: application/json,text/plain,text/html
    min-response-size: 1024   # Chỉ nén response > 1KB để tránh overhead với response nhỏ
```
Gzip giảm kích thước JSON trung bình **60–80%**, tác động lớn nhất ở `exam-service` và `material_service`.

---

## 4. Vấn đề: N+1 query khi load danh sách Exam

### Vấn đề
`ExamRepository.findByCategoryAndSearch()`, `findBySearch()`, `findByCategory_Id()` là native query / derived query — không hỗ trợ `@EntityGraph`. Kết quả trả về `List<Exam>` với `category` là `FetchType.LAZY`.

Khi `ExamService.getAllExams()` gọi `examMapper::toSimpleDto` và mapper truy cập `exam.getCategory()`:
- Exam 1 → SELECT category WHERE id = 'cat-1'
- Exam 2 → SELECT category WHERE id = 'cat-1' (lặp lại!)
- Exam N → SELECT category WHERE id = ...

Với 50 exam → **51 câu SQL** thay vì 1.

### Hậu quả
- Latency của `GET /api/exams?category=...` hoặc `GET /api/exams?search=...` tăng tuyến tính theo số exam.
- Neon serverless mỗi roundtrip ~5–20ms → 50 exam = 250–1000ms chỉ riêng việc load category.

### Cách sửa
Dùng `@BatchSize(size=20)` của Hibernate:
- Đặt trên **class `Category`** (entity của `@ManyToOne`): Hibernate sẽ gom tối đa 20 `category_id` vào 1 câu `WHERE id IN (...)` thay vì N câu riêng lẻ.
- Đặt trên **field `questions`** trong `Exam` (collection `@OneToMany`): tương tự, gom N+1 questions query thành batch.

```java
// Category.java
@BatchSize(size = 20)
public class Category { ... }

// Exam.java
@BatchSize(size = 20)
@OneToMany(mappedBy = "exam")
private List<Question> questions;
```

**Kết quả**: 50 exam + load category → 3 câu SQL thay vì 51 (`ceil(50/20) + 1`). Không cần refactor query, không breaking change.

---

## 5. Vấn đề: Thiếu DB index trên các cột JOIN / ORDER BY / FK

### Vấn đề
Schema Flyway (`V202603251026`, `V202603301355`) không khai báo index nào ngoài Primary Key.

### Hậu quả
Các query thường xuyên chạy **sequential scan** (seqscan) trên toàn bảng:
- `findByCategory_Id` → scan toàn bảng `exams` để tìm `category_id = ?`
- `findTop3ByOrderByParticipantsDesc` → sort toàn bảng `exams` không có index
- Load questions cho exam → scan `questions` không có index trên `exam_id`
- Rating lookup → scan `exam_ratings` không có index trên `exam_id`

Với PostgreSQL, seqscan trên bảng nhỏ (~100 row) gần như không ảnh hưởng. Nhưng khi dữ liệu tăng lên 1000+ row, **latency tăng đột ngột** (từ <1ms → 50–200ms chỉ riêng scan).

### Cách sửa
Thêm Flyway migration `V202605081200__add_performance_indexes.sql`:

```sql
CREATE INDEX IF NOT EXISTS idx_questions_exam_id      ON questions (exam_id);
CREATE INDEX IF NOT EXISTS idx_questions_exam_order   ON questions (exam_id, question_order);
CREATE INDEX IF NOT EXISTS idx_exams_category_id      ON exams (category_id);
CREATE INDEX IF NOT EXISTS idx_exams_participants_desc ON exams (participants DESC);
CREATE INDEX IF NOT EXISTS idx_exam_ratings_exam_id   ON exam_ratings (exam_id);
```

> **Lưu ý**: `attempts` và `attempt_answers` table hiện do `ddl-auto: update` quản lý, chưa có migration. Index cho các bảng này sẽ được thêm ở Phase 2 khi chuyển sang Flyway hoàn toàn.

---

## 6. Vấn đề: PDF serving không có browser cache + không hỗ trợ Range request

### Vấn đề
`MaterialFileController.serveFile()` trả response **không có** `Cache-Control` header và không xử lý `Range` request.

### Hậu quả
- **Không có Cache-Control**: Mỗi lần user reload trang hoặc mở lại PDF, browser phải download lại toàn bộ file từ server → lãng phí bandwidth + chậm.
- **Không có Range support**: PDF viewer (trình xem PDF trong browser) thường dùng HTTP Range requests để tải từng phần của PDF (page-by-page). Không có 206 Partial Content → viewer phải tải **toàn bộ file** trước khi hiển thị trang đầu tiên. File PDF 10MB → user phải chờ tải xong hết mới xem được.

### Cách sửa
Thêm 2 tính năng vào `MaterialFileController.serveFile()`:

1. **Cache-Control header**: `"public, max-age=86400"` (cache 24h ở browser)
2. **HTTP 206 Partial Content**: Đọc `Range` header từ request, trả về `ResourceRegion` tương ứng với đoạn byte được yêu cầu.

```java
List<HttpRange> ranges = requestHeaders.getRange();
if (!ranges.isEmpty()) {
    HttpRange range = ranges.get(0);
    ResourceRegion region = new ResourceRegion(resource, start, end - start + 1);
    return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
        .header(CACHE_CONTROL, "public, max-age=86400")
        .header(ACCEPT_RANGES, "bytes")
        .body(region);
}
```

**Kết quả**: PDF viewer load ngay trang đầu tiên mà không cần tải hết file. Lần mở thứ 2 cùng file: **0ms** (từ browser cache).

---

## Tổng kết thay đổi

| File | Loại thay đổi |
|------|--------------|
| `exam-service/src/main/resources/application.yaml` | show-sql off, pool 5→10, gzip, keepalive |
| `material_service/src/main/resources/application.yaml` | show-sql off, pool 5→10, gzip, keepalive |
| `auth_service/src/main/resources/application.yaml` | show-sql off, pool 5→10, gzip, keepalive |
| `user_service/src/main/resources/application.yaml` | show-sql off, pool 5→10, gzip, keepalive |
| `exam-service/.../entities/Category.java` | `@BatchSize(size=20)` trên class |
| `exam-service/.../entities/Exam.java` | `@BatchSize(size=20)` trên `questions` field |
| `exam-service/.../db/migration/V202605081200__add_performance_indexes.sql` | 5 index mới |
| `material_service/.../controller/MaterialFileController.java` | Cache-Control + HTTP 206 Range |

## Việc còn lại (Phase 2)

- Thêm Redis cache cho `GET /api/exams` (list + search) — hiện vẫn query DB mỗi request.
- Thêm `@CacheEvict` ở các write endpoint để invalidate cache khi dữ liệu thay đổi.
- Chuyển `attempts` và `attempt_answers` sang Flyway để có thể thêm index.
- Centralize CORS + JWT filter tại API Gateway.
