# API Gateway — Changelog

> Ghi lại những thay đổi đã thực hiện trong lần cải tiến này so với phiên bản ban đầu (chỉ có 4 route trống).

---

## Cập nhật — 2026-05-11 (lần 2)

### 1. `filter/ResponseWrapperFilter.java` — mới

Filter bọc response JSON tập trung tại gateway, thay thế `GlobalResponseInterceptor` ở từng service.

- **Order:** `HIGHEST_PRECEDENCE + 2` (sau LoggingFilter và SecurityHeadersFilter).
- Dùng `ServerHttpResponseDecorator` + `DataBufferUtils.join()` để buffer toàn bộ body trước khi xử lý.
- Bọc thành format: `{success, statusCode, message, data, path, timestamp, responseTime}`.
- Bỏ qua `/actuator/**` và `/fallback/**`.
- Ghi đè cả `writeWith()` và `writeAndFlushWith()` để bắt mọi cách upstream ghi response.
- Xóa `Transfer-Encoding`, set `Content-Length` chính xác sau khi bọc.
- `onErrorResume` để tránh propagate lỗi reactive lên CircuitBreaker.

### 2. `filter/LoggingFilter.java` — cập nhật

- **Thêm:** Strip header `Accept-Encoding` trước khi forward xuống upstream.  
  **Lý do:** Upstream services bật `server.compression.enabled: true`. Nếu forward `Accept-Encoding: gzip`, upstream nén response bằng gzip; `ResponseWrapperFilter` nhận bytes gzip, `objectMapper.readTree()` fail với lỗi "Illegal character (CTRL-CHAR, code 31)".  
  Gateway tự handle nén phía client qua `server.compression` riêng.
- **Thêm:** Ghi `startTime` vào exchange attribute (`GATEWAY_START_TIME`) cho `ResponseWrapperFilter` tính `responseTime`.

### 3. Circuit Breaker — điều chỉnh

| Tham số | Cũ | Mới | Lý do |
|---------|----|----|-------|
| `sliding-window-size` | 10 | 20 | Ít nhạy hơn với lỗi lẻ tẻ |
| `minimum-number-of-calls` | _(không có)_ | 10 | Cần đủ sample trước khi trip |
| `failure-rate-threshold` | 50% | 60% | Giảm false positive |
| `slow-call-rate-threshold` | _(không có)_ | 80% | Tính cả slow call như failure |
| `slow-call-duration-threshold` | _(không có)_ | 15s | Call > 15s là slow |
| `wait-duration-in-open-state` | 10s | 15s | Thêm thời gian cho service recover |

### 4. Timeout — điều chỉnh

| Route | Cũ | Mới | Lý do |
|-------|----|-----|-------|
| auth-service | 10s | 12s | Hikari cold start 8s + buffer |
| user-service | 10s | 12s | Như auth |
| exam-service | 20s | 25s | Query phức tạp, thêm buffer |
| material-service | 60s | 60s | Giữ nguyên |

### 5. Retry backoff — điều chỉnh

- `firstBackoff: 100ms` → `200ms`
- `maxBackoff: 500ms` → `1000ms`

---

## Phiên bản cải tiến — 2026-05-11

### 1. Dependency mới (`pom.xml`)

| Dependency | Lý do thêm |
|------------|------------|
| `spring-cloud-starter-circuitbreaker-reactor-resilience4j` | Bật tính năng CircuitBreaker filter trong Gateway |
| `lombok` | Giảm boilerplate ở các filter class (chủ yếu `@Slf4j`) |

---

### 2. File Java mới

#### `filter/LoggingFilter.java`
- Implement `GlobalFilter` + `Ordered.HIGHEST_PRECEDENCE` (chạy đầu tiên trong chain).
- Sinh `X-Request-Id` (12 ký tự hex ngẫu nhiên) cho mỗi request.
- Forward header `X-Request-Id` xuống downstream service để có thể trace log xuyên suốt.
- Log `-->` (inbound) và `<--` (outbound) gồm: requestId, HTTP method/status, path, thời gian xử lý (ms).

#### `filter/SecurityHeadersFilter.java`
- Implement `GlobalFilter` + `Ordered.HIGHEST_PRECEDENCE + 1` (chạy ngay sau LoggingFilter).
- Tự động thêm vào **mọi response** các header bảo mật:
  - `X-Content-Type-Options: nosniff` — chặn MIME sniffing
  - `X-Frame-Options: DENY` — chặn clickjacking trong iframe
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: geolocation=(), microphone=(), camera=()`

#### `config/CorsConfig.java`
- Định nghĩa `CorsWebFilter` bean (WebFlux-compatible).
- Đọc danh sách origin cho phép từ config `cors.allowed-origins` (khác nhau giữa dev/prod).
- Tập trung CORS tại gateway — **các service downstream không cần tự config CORS nữa**.
- Cho phép tất cả method: GET, POST, PUT, PATCH, DELETE, OPTIONS.
- `allowCredentials: true`, `maxAge: 3600s`.

#### `controller/FallbackController.java`
- Endpoint `GET|POST /fallback/service-unavailable` — nhận forward từ CircuitBreaker khi service down.
- Trả HTTP 503 với body JSON chuẩn: `success`, `statusCode`, `message`, `path`, `timestamp`.
- Không để FE nhận lỗi 500 mặc định của gateway khi service không phản hồi.

---

### 3. Cập nhật `application.yaml`

#### Nén response
```yaml
server:
  compression:
    enabled: true
    mime-types: application/json,text/plain,text/html
    min-response-size: 1024
```

#### Profile-based config
```yaml
spring:
  profiles:
    active: ${SPRING_PROFILES_ACTIVE:dev}
```

#### HTTP client timeout (global)
```yaml
spring.cloud.gateway.server.webflux.httpclient:
  connect-timeout: 5000   # ms
  response-timeout: 30s
```

#### Timeout per-route (metadata)
| Route | `response-timeout` |
|-------|--------------------|
| auth-service | 10s |
| user-service | 10s |
| exam-service | 20s |
| material-service | 60s (file download) |

#### Circuit Breaker (mỗi route)
- Filter `CircuitBreaker` với `fallbackUri: forward:/fallback/service-unavailable`.
- Cấu hình mặc định: sliding window 10, failure rate 50%, mở 10s, half-open 5 calls.
- Tự động chuyển từ OPEN → HALF_OPEN sau thời gian chờ.

#### Retry (auth, user, exam — không áp dụng material)
- 2 lần retry, chỉ trên **GET**, chỉ khi nhận **503 SERVICE_UNAVAILABLE**.
- Backoff: 100ms → 500ms (factor 2).
- Material service không retry vì file download lớn có thể bị duplicate stream.

#### Eureka instance
```yaml
eureka:
  instance:
    prefer-ip-address: true
    instance-id: ${spring.application.name}:${random.value}
    lease-renewal-interval-in-seconds: 10
    lease-expiration-duration-in-seconds: 30
  client:
    registry-fetch-interval-seconds: 10
```

#### Actuator
- Expose: `health`, `info`, `gateway`.
- `GET /actuator/gateway/routes` — xem toàn bộ route đang active.
- `GET /actuator/health` — healthcheck.

---

### 4. File mới: `application-dev.yaml`

```yaml
cors:
  allowed-origins:
    - "http://localhost:3000"
    - "http://localhost:3001"

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/

management:
  endpoint:
    health:
      show-details: always
```

### 5. File mới: `application-prod.yaml`

```yaml
cors:
  allowed-origins: ${ALLOWED_ORIGINS}

eureka:
  client:
    service-url:
      defaultZone: ${EUREKA_URL}

management:
  endpoint:
    health:
      show-details: when-authorized
```

---

## Điều KHÔNG thay đổi

- Routing path (`/api/auth/**`, `/api/users/**`, v.v.) — giữ nguyên để không break FE.
- Spring Boot version (3.5.13) và Spring Cloud version (2025.0.1) — không bump để tránh rủi ro.
- Không thêm JWT filter tại gateway — các service vẫn tự verify JWT như cũ. Đây là bước tiếp theo có thể xem xét.
