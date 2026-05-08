# CLAUDE.md

> Tài liệu hướng dẫn dành cho Claude Code (và developer mới) khi làm việc trên backend của hệ thống. Mục tiêu của file này là mô tả kiến trúc, các quy ước, hợp đồng giữa các service, cách chạy và cách mở rộng hệ thống theo chuẩn **production microservice**.

---

## 1. Tổng quan dự án

Backend của hệ thống là một **mono-repo Maven multi-module** chứa các microservice viết bằng **Spring Boot 4.x** (Java 21). Toàn bộ hệ thống được đăng ký qua **Eureka Discovery Server** và truy cập từ FE thông qua một **API Gateway** duy nhất.

**Stack chính:**

- Java 21, Spring Boot 4.0.3 (parent), Spring Cloud 2025.x
- Spring Cloud Gateway (WebFlux) + Spring Cloud LoadBalancer
- Spring Cloud Netflix Eureka (Discovery Server + Client)
- Spring Cloud OpenFeign (gọi service-to-service)
- Spring Security + JJWT 0.11.5 (HS256)
- Spring Data JPA + Hibernate (PostgreSQL, Neon serverless)
- Flyway (chỉ dùng ở `exam-service`)
- MapStruct (chỉ dùng ở `exam-service`)
- Lombok
- Docker, Docker Compose

**Triết lý kiến trúc:**

- Một service = một bounded context = một database riêng (database-per-service).
- Frontend không bao giờ gọi thẳng service nội bộ — luôn đi qua **API Gateway** (`http://localhost:8080`).
- Service-to-service: dùng **Feign client** + Eureka service discovery (không hardcode host/port).
- Stateless authentication bằng **JWT** lưu trong **httpOnly cookie**; service nội bộ chỉ verify chữ ký, không gọi lại auth-service.

---

## 2. Cấu trúc repository

```
BE/
├── pom.xml                  # Parent POM (Maven multi-module)
├── docker-compose.yml       # Orchestrate toàn bộ stack
├── .dockerignore
├── discovery_server/        # Eureka server (port 8761)
├── api_gateway/             # Spring Cloud Gateway (port 8080)
├── auth_service/            # Đăng ký / đăng nhập / phát JWT (port 8081)
├── user_service/            # Profile người dùng (port 8082)
├── material_service/        # Tài liệu học, file PDF (port 8083)
├── exam-service/            # Đề thi, câu hỏi, attempt, rating (port 8084)
├── question_service/        # ⚠ Legacy, chưa khai báo trong parent POM
└── result-service/          # ⚠ Legacy, chưa khai báo trong parent POM
```

> **Lưu ý:** `question_service/` và `result-service/` còn nằm trong repo nhưng **không** được liệt kê trong `<modules>` của parent `pom.xml` và **không** có `Dockerfile`. Phần lớn chức năng của chúng đã được hợp nhất vào `exam-service`. Không thêm code mới vào hai module này — nếu cần thiết hãy đề xuất xoá hoặc khôi phục chính thức.

Module được khai báo trong `pom.xml` (parent):

```xml
<modules>
    <module>auth_service</module>
    <module>user_service</module>
    <module>discovery_server</module>
    <module>exam-service</module>
    <module>material_service</module>
</modules>
```

`api_gateway` có parent là `spring-boot-starter-parent` chứ **không** kế thừa parent BE — nó là một build độc lập trong cùng repo.

---

## 3. Bản đồ service & cổng (port map)

| Service            | Spring app name      | Port  | Database (Neon Postgres) | Đăng ký Eureka |
| ------------------ | -------------------- | ----- | ------------------------ | -------------- |
| `discovery_server` | `discovery-server`   | 8761  | —                        | (server)       |
| `api_gateway`      | `api-gateway`        | 8080  | —                        | ✅              |
| `auth_service`     | `auth-service`       | 8081  | `auth_db`                | ✅              |
| `user_service`     | `user-service`       | 8082  | `user_db`                | ✅              |
| `material_service` | `material-service`   | 8083  | `material_db`            | ✅              |
| `exam-service`     | `exam-service`       | 8084  | `exam_db`                | ✅              |

Tất cả service business đều dùng chung một Neon Postgres cluster (`ep-shiny-violet-a1soua7r-pooler.ap-southeast-1.aws.neon.tech`) với database tách biệt.

---

## 4. Sơ đồ luồng request

```
                       ┌────────────────────┐
                       │   Discovery Server │
                       │      (Eureka)      │
                       └─────────▲──────────┘
                                 │ register/heartbeat
        ┌────────────────────────┼─────────────────────────────┐
        │                        │                             │
        ▼                        ▼                             ▼
┌───────────────┐        ┌───────────────┐            ┌────────────────┐
│  auth-service │◄──────▶│  user-service │            │ material-svc   │
└──────▲────────┘ Feign  └──────▲────────┘            └──────▲─────────┘
       │                        │                            │
       │                        │  lb://<service-name>       │
       │                        │                            │
       │                ┌───────┴────────┐                   │
       │                │   API Gateway  │◄──────────────────┘
       │                │  (port 8080)   │
       │                └───────▲────────┘
       │                        │
       │                        │   /api/auth/**, /api/users/**
       │                        │   /api/exams/**, /api/categories/**
       │                        │   /api/attempts/**, /api/materials/**
       │                        │
       │                ┌───────┴────────┐
       └────────────────│   Frontend     │
                        │ (Next.js, FE)  │
                        └────────────────┘
```

---

## 5. Mô tả từng service

### 5.1 Discovery Server (`discovery_server`)

- **Vai trò:** Eureka registry, mọi service khác đăng ký tại đây.
- **Endpoint:** `http://discovery-server:8761/eureka/` (trong Docker network) hoặc `http://localhost:8761` (local).
- **Cấu hình quan trọng:**
  - `eureka.client.register-with-eureka: false`
  - `eureka.client.fetch-registry: false`
  - Spring Security cho phép `permitAll` để client có thể đăng ký mà không bị chặn CSRF.
- **Healthcheck (compose):** `wget http://127.0.0.1:8761/actuator/health` — các service khác `depends_on: condition: service_healthy`.

### 5.2 API Gateway (`api_gateway`)

- **Framework:** Spring Cloud Gateway (WebFlux, **không** WebMVC).
- **Routing** (`api_gateway/src/main/resources/application.yaml`):

  | Path predicate                                         | Forward tới                  |
  | ------------------------------------------------------ | ---------------------------- |
  | `/api/auth/**`                                         | `lb://auth-service`          |
  | `/api/users/**`                                        | `lb://user-service`          |
  | `/api/exams/**`, `/api/categories/**`, `/api/attempts/**` | `lb://exam-service`        |
  | `/api/materials/**`                                    | `lb://material_service` ⚠   |

  > ⚠ Hiện tại route material đang dùng `lb://material_service` (có dấu `_`) trong khi `spring.application.name` của service là `material-service` (có dấu `-`). Khi chỉnh sửa cần xác nhận tên đăng ký Eureka trùng khớp — nếu không gateway sẽ trả `503 Service Unavailable`.

- **Hiện chưa có** filter JWT ở gateway. Mỗi service tự verify JWT trong filter chain riêng. Đây là điểm có thể centralize trong tương lai.
- **CORS:** Chưa cấu hình ở gateway. `material_service` tự cấu hình `CorsConfig` cho phép `allowedOriginPatterns("*")`.

### 5.3 Auth Service (`auth_service`)

- **Trách nhiệm:** đăng ký, đăng nhập, đăng xuất, phát hành JWT.
- **Endpoint** (prefix `/api/auth`):
  - `POST /register` — gọi `user-service` qua Feign để tạo `User`, sau đó lưu `Credential` (email + bcrypt password + userId).
  - `POST /login` — verify password (BCrypt), gọi `user-service` xác nhận user tồn tại, phát JWT, set vào cookie `token` (httpOnly, path `/`, maxAge 24h).
  - `DELETE /logout` — xoá cookie `token` (set maxAge 0).
- **Bảng:** `credentials(id, email, password, user_id)`.
- **Service-to-service:** `UserServiceClient` (`@FeignClient(name = "user-service")`) gọi `POST /api/users` và `GET /api/users/{id}`.
- **JWT:**
  - Algorithm: HS256
  - Subject: `userId` (String)
  - Expiration: 24h (`jwt.expiration = 86400000`)
  - Secret: `jwt.secret` — **phải override bằng env trong production** (xem mục Bảo mật).
- **Cookie:** hiện tại set `Secure=false` để dev qua HTTP. **Trong production phải đặt `Secure=true` + `SameSite=Lax/None`.**

### 5.4 User Service (`user_service`)

- **Trách nhiệm:** quản lý profile (`name`, `phoneNumber`, `email`, `currentStatus`, `createdAt`).
- **Endpoint** (prefix `/api/users`):
  - `POST /` — tạo user (được `auth-service` gọi nội bộ; **không** nên expose ra ngoài qua gateway nếu muốn ép tất cả tạo user qua flow register).
  - `GET /{id}` — lấy user theo id (public theo cấu hình hiện tại).
  - `GET /me` — lấy user hiện tại từ JWT (yêu cầu authenticated).
- **JWT auth:** `JwtAuthFilter` đọc cookie `access_token` ⚠ (xem mục "Sự khác biệt cookie name"). Nếu hợp lệ, set `Authentication` với principal = `userId`.
- **Security:**
  ```
  /api/users/me   -> authenticated
  /api/users/**   -> permitAll
  anyRequest      -> authenticated
  ```

### 5.5 Exam Service (`exam-service`)

- **Trách nhiệm (lớn nhất):** đề thi, danh mục, câu hỏi, lượt làm bài, đánh giá đề.
- **Endpoint:**
  - `/api/exams` — CRUD đề + `GET /popular`, `GET /{id}/questions`, `POST /{id}/submit`.
  - `/api/categories` — CRUD danh mục.
  - `/api/attempts` — `GET /me/summary`, `GET /users/{userId}/summary`, `GET /{id}`.
  - `/api/exams/{examId}/rating` — `GET` summary, `POST` submit.
- **Entity chính:** `Exam`, `Category`, `Question`, `Attempt`, `AttemptAnswer`, `ExamRating`.
- **Đặc thù:** dùng cột JSON (`@JdbcTypeCode(SqlTypes.JSON)`) cho `title` & `description` đa ngôn ngữ (`Map<String, String>`), và cho `options` của question.
- **JWT auth:** `JwtAuthFilter` đọc cookie `access_token` **hoặc** `token` — endpoint `permitAll` nhưng `Principal` được set khi token hợp lệ (controller dựa vào `principal.getName()` để lấy userId).
- **Migration:** dùng **Flyway** (`exam-service/src/main/resources/db/migration/`). Đây là service duy nhất có migration scripts.
- **Mapper:** dùng **MapStruct** (1.7.0.Beta1). Chạy `mvn compile` để generate impl.

### 5.6 Material Service (`material_service`)

- **Trách nhiệm:** CRUD tài liệu học (`learning_materials`) + serve file PDF từ ổ đĩa.
- **Endpoint** (prefix `/api/materials`):
  - `GET /` (paginated, filter theo `category`)
  - `GET /{id}`
  - `POST /`, `PUT /{id}`, `DELETE /{id}`
  - `GET /search?title=...`
  - `GET /type/{type}`
  - `GET /recent`
  - `GET /{id}/file?download=true|false` — stream PDF inline hoặc attachment.
- **File storage:** đọc trực tiếp từ filesystem, root path đặt qua env `FILE_BASE_PATH` (`file.base-path`). Trong repo có thư mục `material_service/Material_Data` chứa file dev.
- **CORS:** tự cấu hình `allowedOriginPatterns("*")`, `allowCredentials(false)`.
- **Bảo mật:** hiện không có JWT filter — endpoint là public. Nếu muốn giới hạn, cần thêm filter tương tự các service khác.

---

## 6. Hợp đồng & quy ước chung (cross-cutting)

### 6.1 Định dạng response

`auth_service` và `user_service` dùng `GlobalResponseInterceptor` (implement `ResponseBodyAdvice`) để bọc mọi response thành:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "…",
  "data": { ... },
  "path": "/api/...",
  "timestamp": "2026-...",
  "responseTime": "12 ms"
}
```

`exam-service` và `material_service` **không** dùng wrapper này — trả `ResponseEntity` thuần. **Khi thêm endpoint mới, hãy giữ nguyên convention của service đang chỉnh để FE không phải xử lý hai dạng response.**

### 6.2 Exception handling

Mỗi service tự define `GlobalExceptionHandler` (`@RestControllerAdvice`) với `ErrorResponse` riêng. Hiện tại nhiều handler chỉ `catch Exception.class -> 500` — khi thêm tính năng nên thêm handler cụ thể (`ResourceNotFoundException`, `MethodArgumentNotValidException`, `IllegalArgumentException`...) và trả mã HTTP đúng nghĩa.

### 6.3 JWT contract (giữa các service)

- Algorithm: **HS256**
- Subject: `userId` (luôn là string của Long)
- Secret: **phải giống nhau** giữa `auth-service`, `user-service`, `exam-service`. Cấu hình hiện tại:
  - `auth_service/application.yaml`: `jwt.secret: FizzCoConCa...` (hardcoded)
  - `exam-service/application.yaml`: `jwt.secret: ${JWT_SECRET:FizzCoConCa...}` (env-overridable)
  - `user_service`: chưa expose `jwt.secret` trong yaml — cần kiểm tra `user_service/.../service/JwtService.java` và đồng bộ.
- **Khi đổi secret phải đổi ở mọi service**, nếu không token sẽ fail verify.

### 6.4 Cookie name — ⚠ inconsistency cần biết

| Service          | Set cookie name | Đọc cookie name           |
| ---------------- | --------------- | -------------------------- |
| `auth-service`   | `token`         | —                          |
| `user-service`   | —               | `access_token`             |
| `exam-service`   | —               | `access_token` **hoặc** `token` |

`auth-service` đang set cookie là `token`, trong khi `user-service` chỉ đọc `access_token`. Hệ quả: gọi `/api/users/me` sau login sẽ **fail xác thực**. `exam-service` đã workaround bằng cách chấp nhận cả hai. **Khi sửa flow auth, hãy thống nhất một tên duy nhất** (gợi ý: dùng `access_token` ở mọi nơi, hoặc rename về `token`). Đừng thêm cookie name thứ ba.

### 6.5 Service-to-service

- Dùng **Feign client** với tên service đúng như `spring.application.name` (kebab-case): `auth-service`, `user-service`, `exam-service`, `material-service`.
- Khi thêm Feign client mới: nhớ `@EnableFeignClients` ở class `*Application` (auth_service đã có).
- **Không** hardcode `http://host:port` — luôn dùng `lb://<service-name>` (cho gateway) hoặc tên Feign (cho client).

### 6.6 Database

- DDL hiện đang dùng `spring.jpa.hibernate.ddl-auto: update` ở **mọi service trừ `exam-service`**. Đây là setting **không an toàn cho production**: mất control schema, không rollback được, race condition khi chạy nhiều instance.
- **Khuyến nghị**: chuyển dần sang **Flyway** (đã có sẵn ở exam-service làm reference) — `ddl-auto: validate` + migration script.
- Hikari pool: `maximum-pool-size: 5`, `minimum-idle: 1`, `idle-timeout: 30000`. Phù hợp với Neon serverless free tier; tăng pool khi scale.

---

## 7. Chạy hệ thống

### 7.1 Local (chạy từng service trong IDE)

Trình tự bắt buộc:

1. `discovery_server` (port 8761) — start trước, chờ `UP`.
2. `api_gateway`, `auth_service`, `user_service`, `exam-service`, `material_service` — có thể chạy song song.

Build toàn bộ:

```powershell
# Từ thư mục BE/
mvn clean install -DskipTests
```

Build một module và phụ thuộc của nó:

```powershell
mvn clean package -pl auth_service -am -DskipTests
```

### 7.2 Docker Compose

```powershell
docker compose up --build
```

Stack sẽ khởi động theo healthcheck của Eureka. Service dùng network bridge `be-network`; gateway expose port 8080 ra host.

> Compose hiện hardcode credentials Neon trong `docker-compose.yml`. **Tuyệt đối không commit thật** — hãy xem mục Bảo mật.

### 7.3 Health & monitoring

- Mỗi service nên expose `spring-boot-starter-actuator` (gateway và discovery đã có). User/Auth/Exam/Material chưa thêm — **nên bổ sung** `/actuator/health`, `/actuator/info` để compose healthcheck và prod monitoring.

---

## 8. Bảo mật — checklist trước khi đẩy production

> Đây là phần **bắt buộc xem lại** trước khi public hệ thống.

1. **Secrets đang lộ trong repo:**
   - `docker-compose.yml` chứa `DB_USERNAME`, `DB_PASSWORD` Neon plaintext.
   - `auth_service/application.yaml`, `user_service/application.yaml`, `material_service/application.yaml` chứa username/password DB hardcoded.
   - `jwt.secret` mặc định là literal `FizzCoConCaFizzCoConCa...`.
   
   **Action:**
   - Rotate Neon password ngay lập tức (đã bị lộ trong git history).
   - Chuyển toàn bộ secret sang biến môi trường + `.env` (đã có `spring-dotenv` trong dependency management).
   - Cân nhắc dùng Spring Cloud Config hoặc HashiCorp Vault khi scale.
2. **JWT cookie:** đặt `Secure=true`, `SameSite=Lax` (hoặc `None` nếu cross-site), set domain phù hợp.
3. **CORS:** không để `allowedOriginPatterns("*")` + `allowCredentials(true)` — không an toàn. Centralize ở API Gateway thay vì mỗi service một cấu hình.
4. **CSRF:** đang `disable()` ở mọi nơi vì stateless JWT — OK với cookie httpOnly + SameSite, nhưng phải đảm bảo không có endpoint nào nhận form-urlencoded từ origin khác.
5. **Authorization:** hiện hầu hết endpoint là `permitAll`. Cần định nghĩa role/scope (admin, teacher, student) và thêm `@PreAuthorize` hoặc rule trong filter chain.
6. **JwtService ở user_service & exam-service** chưa được kiểm tra ở tài liệu này — verify rằng đều dùng cùng secret và cùng subject claim.

---

## 9. Quy ước phát triển

### 9.1 Đặt tên

- Module folder: snake_case hoặc kebab-case (giữ nguyên hiện trạng — `auth_service`, `exam-service`).
- `spring.application.name`: **kebab-case** (`auth-service`, `exam-service`...). Đây là tên Feign/`lb://` dùng — đừng đổi nếu không sửa toàn bộ caller.
- Java package: `com.edu.<service>` (riêng `material_service` đang là `com.testwebsite.backend.material` — legacy, không bắt buộc đổi nhưng nên thống nhất khi refactor lớn).

### 9.2 Khi thêm một service mới

1. Tạo module Maven kế thừa parent BE (`relativePath ../pom.xml`).
2. Khai báo trong `<modules>` của parent `pom.xml`.
3. Thêm `spring-cloud-starter-netflix-eureka-client`.
4. Cấu hình `spring.application.name`, `server.port` (chọn port chưa dùng), `eureka.client.service-url.defaultZone`.
5. Thêm route ở `api_gateway/src/main/resources/application.yaml` — predicate `Path=/api/<resource>/**`, uri `lb://<spring-app-name>`.
6. Tạo `Dockerfile` theo template của auth/user/exam (multi-stage Maven + temurin-21-alpine, user `spring:spring`, EXPOSE port).
7. Thêm block service trong `docker-compose.yml` với `depends_on: discovery_server: condition: service_healthy`.
8. Nếu service cần auth: copy `JwtAuthFilter` + `SecurityConfig` từ exam-service (chấp nhận cả `access_token` và `token`).

### 9.3 Khi thêm endpoint mới

- Kiểm tra trước: response wrapper convention của service đó (mục 6.1).
- Thêm route ở gateway nếu prefix mới.
- Update mục 5 trong file này (giữ tài liệu sống).

### 9.4 Migration & schema

- Service mới: **dùng Flyway từ đầu** thay vì `ddl-auto: update`.
- Tên file migration: `V<yyyyMMddHHmm>__<snake_case_description>.sql` (xem `exam-service/src/main/resources/db/migration/`).

### 9.5 Test

- Unit test bằng `spring-boot-starter-test` — đã có dependency.
- `exam-service` có sẵn `spring-boot-starter-flyway-test` và `spring-security-test` — dùng để viết integration test với DB thật (Testcontainers/Neon test branch).
- Hiện codebase có rất ít test — khi đụng vào module nào, ưu tiên thêm test cho luồng đó trước khi mở rộng.

---

## 10. Vấn đề đã biết (Known issues / TODO)

| # | Vấn đề | Mức độ | Ghi chú |
|---|--------|--------|---------|
| 1 | Cookie name không thống nhất (`token` vs `access_token`) | High | Mục 6.4 |
| 2 | Secrets (DB, JWT) hardcode trong yaml & compose | Critical | Mục 8 |
| 3 | `material_service` route ở gateway dùng `material_service` thay vì `material-service` | Medium | Mục 5.2 |
| 4 | `question_service`, `result-service` tồn tại nhưng không build | Low | Mục 2 |
| 5 | `ddl-auto: update` ở 4/5 service | High | Mục 6.6 |
| 6 | Thiếu CORS centralized + JWT filter ở Gateway | Medium | Mục 5.2 |
| 7 | `material_service` không có JWT filter, mọi endpoint public | Medium | Mục 5.6 |
| 8 | `GlobalExceptionHandler` ở auth/user trả 500 cho mọi exception | Medium | Mục 6.2 |
| 9 | `auth_service.AuthServiceApplication` print `DB_PASSWORD` ra stdout | Critical | Xoá trước khi prod |
| 10 | Chưa có actuator + healthcheck ở các service business | Medium | Mục 7.3 |

Khi xử lý một issue, cập nhật trạng thái trong bảng này.

---

## 11. Liên hệ nhanh khi đọc code

- **Auth flow:** bắt đầu từ `auth_service/.../controller/AuthController.java` → `service/AuthService.java` → `client/UserServiceClient.java` (Feign).
- **JWT verify flow (mọi service):** `*/security/JwtAuthFilter.java` → `*/security/JwtService.java`.
- **Routing:** `api_gateway/src/main/resources/application.yaml`.
- **Multi-language (i18n):** xem entity `Exam` ở `exam-service` (`title`, `description` là `Map<String,String>` lưu JSON).
- **File serving:** `material_service/.../controller/MaterialFileController.java`.
