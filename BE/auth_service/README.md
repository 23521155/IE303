# Auth Service

Microservice chịu trách nhiệm xác thực người dùng: đăng ký, đăng nhập, đăng xuất và phát hành JWT. Là điểm vào duy nhất cho luồng authentication trong hệ thống.

---

## Table of Contents

- [Overview](#overview)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Locally](#running-locally)
- [Running with Docker](#running-with-docker)
- [Testing](#testing)
- [Security Notes](#security-notes)
- [Known Limitations](#known-limitations)

---

## Overview

| Item | Value |
|------|-------|
| Spring app name | `auth-service` |
| Port | `8081` |
| Database | PostgreSQL (`auth_db`) — Neon serverless |
| Eureka | Registered as `auth-service` |
| Gateway prefix | `/api/auth/**` |

**Dependencies on other services:**

- `user-service` — called via **Feign client** to create and verify user profiles during register/login.

---

## API Endpoints

All endpoints are prefixed with `/api/auth` and routed through the API Gateway (`http://localhost:8080`).

### `POST /api/auth/register`

Tạo tài khoản mới. Gọi `user-service` để tạo profile trước, sau đó lưu credential.

**Request body:**

```json
{
  "name": "Nguyen Van A",
  "email": "user@example.com",
  "phoneNumber": "0901234567",
  "status": "student",
  "password": "password123"
}
```

**Validation:**
- `name`: 3–20 ký tự, không được trống
- `email`: định dạng email hợp lệ, không được trống
- `phoneNumber`: không được trống
- `status`: không được trống
- `password`: tối thiểu 8 ký tự, không được trống

**Response `200 OK`:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Đăng ký thành công",
  "data": { "credentialId": 12 },
  "path": "/api/auth/register",
  "timestamp": "2026-05-10T11:00:00Z",
  "responseTime": "145 ms"
}
```

**Error responses:**

| HTTP | Trường hợp |
|------|-----------|
| `400` | Validation thất bại (tên quá ngắn, email sai format, v.v.) |
| `409` | Email đã được đăng ký |
| `500` | `user-service` không phản hồi hoặc lỗi nội bộ |

---

### `POST /api/auth/login`

Xác thực email + password. Nếu đúng, phát JWT và set vào **httpOnly cookie**.

**Request body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response `200 OK`:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Đăng nhập thành công",
  "data": { "userId": 99 },
  "path": "/api/auth/login",
  "timestamp": "2026-05-10T11:01:00Z",
  "responseTime": "52 ms"
}
```

**Set-Cookie header:**

```
token=<jwt>; Path=/; Max-Age=86400; HttpOnly; SameSite=Lax
```

> Token **không** trả về trong response body — chỉ tồn tại trong cookie để tránh XSS.

**Error responses:**

| HTTP | Trường hợp |
|------|-----------|
| `400` | Validation thất bại |
| `401` | Email không tồn tại hoặc sai mật khẩu |

---

### `DELETE /api/auth/logout`

Xóa cookie `token` (set `Max-Age=0`). Stateless — không cần body, không cần token.

**Response `200 OK`:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Đăng xuất thành công",
  "data": "OK"
}
```

---

## Authentication Flow

```
Client                  API Gateway            Auth Service           User Service
  │                          │                      │                      │
  │  POST /api/auth/register │                      │                      │
  │─────────────────────────>│                      │                      │
  │                          │──────────────────────>│                      │
  │                          │                      │  POST /api/users     │
  │                          │                      │─────────────────────>│
  │                          │                      │<─────────────────────│
  │                          │                      │  save Credential     │
  │                          │<──────────────────────│  (email+bcrypt)      │
  │<─────────────────────────│                      │                      │
  │                          │                      │                      │
  │  POST /api/auth/login    │                      │                      │
  │─────────────────────────>│                      │                      │
  │                          │──────────────────────>│                      │
  │                          │                      │  findByEmail         │
  │                          │                      │  BCrypt.matches()    │
  │                          │                      │  generateToken(JWT)  │
  │   200 + Set-Cookie: token│<──────────────────────│                      │
  │<─────────────────────────│                      │                      │
  │                          │                      │                      │
  │  GET /api/users/me       │                      │                      │
  │  Cookie: token=<jwt>     │                      │                      │
  │─────────────────────────>│──────────────────────────────────────────── (user-service verifies JWT)
```

**JWT contract:**

| Field | Value |
|-------|-------|
| Algorithm | HS256 |
| Subject | `userId` (string) |
| Expiration | 24h (`86400000 ms`) |
| Secret | Phải khớp với `user-service` và `exam-service` |

---

## Project Structure

```
src/main/java/com/edu/auth_service/
├── AuthServiceApplication.java
│
├── client/                          # Feign clients gọi external services
│   ├── dto/                         # DTO của user-service (external contract)
│   │   ├── CreateUserRequest.java
│   │   └── UserResponse.java
│   ├── decoder/
│   │   └── UserServiceErrorDecoder.java  # Map HTTP status → custom exception
│   └── UserServiceClient.java
│
├── config/
│   ├── FeignConfig.java             # Đăng ký ErrorDecoder
│   └── WebConfig.java               # Đăng ký RequestTimeInterceptor
│
├── controller/
│   └── AuthController.java          # POST /register, POST /login, DELETE /logout
│
├── dto/
│   ├── internal/
│   │   └── LoginResult.java         # Record nội bộ (token + userId), KHÔNG expose API
│   ├── request/
│   │   ├── LoginRequest.java
│   │   └── RegisterRequest.java
│   └── response/
│       ├── ApiResponse.java         # Wrapper chuẩn cho mọi response thành công
│       ├── ErrorResponse.java       # Wrapper cho error response
│       ├── LoginResponse.java       # { userId }
│       └── RegisterResponse.java    # { credentialId }
│
├── entity/
│   └── Credential.java              # credentials(id, email UNIQUE, password, userId)
│
├── exception/
│   ├── AuthException.java           # 401 Unauthorized
│   ├── DuplicateEmailException.java # 409 Conflict
│   └── GlobalExceptionHandler.java  # @RestControllerAdvice với @ResponseStatus đúng
│
├── interceptor/
│   ├── GlobalResponseInterceptor.java  # Bọc mọi response thành format chuẩn
│   └── RequestTimeInterceptor.java     # Đo thời gian xử lý request
│
├── repository/
│   └── CredentialRepository.java    # findByEmail(String email)
│
└── security/
    ├── JwtService.java              # generateToken(userId) — HS256
    └── SecurityConfig.java          # permitAll: /api/auth/**, /actuator/**

src/main/resources/
├── application.yaml                 # Base config, không chứa secret
├── application-dev.yaml             # Dev credentials (gitignored ngoài repo thật)
└── application-prod.yaml            # Dùng env vars, ddl-auto=validate

src/test/java/com/edu/auth_service/
├── controller/AuthControllerTest.java   # 8 unit tests
├── service/AuthServiceTest.java         # 8 unit tests
└── service/JwtServiceTest.java          # 4 unit tests
```

---

## Configuration

### Profiles

| Profile | Kích hoạt khi | Mô tả |
|---------|--------------|-------|
| `dev` | Mặc định (không set env var) | Dùng Neon DB dev, JWT secret mặc định |
| `prod` | `SPRING_PROFILES_ACTIVE=prod` | Tất cả secret từ env vars, `ddl-auto=validate` |

### Environment Variables (prod profile)

| Biến | Bắt buộc | Mô tả |
|------|----------|-------|
| `SPRING_PROFILES_ACTIVE` | Không | Default `dev`. Set `prod` cho production |
| `DB_URL` | Prod | `jdbc:postgresql://<host>/<db>?sslmode=require` |
| `DB_USERNAME` | Prod | Database username |
| `DB_PASSWORD` | Prod | Database password |
| `JWT_SECRET` | Prod | Chuỗi ngẫu nhiên >= 32 ký tự. **Phải khớp với user-service và exam-service** |
| `EUREKA_URL` | Không | Default `http://discovery-server:8761/eureka/` |

### Dùng `.env` file (khuyến nghị cho VPS)

Project có sẵn `spring-dotenv`. Tạo file `.env` trong thư mục chạy jar:

```dotenv
SPRING_PROFILES_ACTIVE=prod
DB_URL=jdbc:postgresql://your-host:5432/auth_db?sslmode=require
DB_USERNAME=your_user
DB_PASSWORD=your_password
JWT_SECRET=your-random-secret-min-32-chars
EUREKA_URL=http://your-discovery-server:8761/eureka/
```

`spring-dotenv` đọc file này tự động — không cần `source` hay `export`.

---

## Running Locally

### Yêu cầu

- Java 21+
- Discovery Server đang chạy tại `http://localhost:8761`
- User Service đang chạy tại `http://localhost:8082`

### Thứ tự khởi động

```
1. discovery_server  (port 8761)
2. user_service      (port 8082)
3. auth_service      (port 8081)
```

### Build & Run

```bash
# Từ thư mục BE/ (root)
mvn clean package -pl auth_service -am -DskipTests

# Chạy với profile dev (default)
java -jar auth_service/target/auth_service-0.0.1-SNAPSHOT.jar

# Hoặc dùng Maven wrapper trong auth_service/
./mvnw spring-boot:run
```

### Health check

```bash
curl http://localhost:8081/actuator/health
# {"status":"UP"}
```

---

## Running with Docker

```bash
# Từ thư mục BE/ (root) — khởi động toàn bộ stack
docker compose up --build

# Chỉ auth-service (sau khi discovery đã up)
docker compose up auth-service
```

**Dockerfile** (multi-stage, temurin-21-alpine):

```
Stage 1: maven:3.9-eclipse-temurin-21  → build jar
Stage 2: eclipse-temurin:21-jre-alpine → runtime
User: spring:spring (non-root)
Port: 8081
```

---

## Testing

```bash
# Chạy toàn bộ unit tests
./mvnw test

# Chạy từng class
./mvnw test -Dtest="AuthServiceTest"
./mvnw test -Dtest="AuthControllerTest"
./mvnw test -Dtest="JwtServiceTest"
```

**Coverage hiện tại: 20 unit tests**

| Class | Tests | Coverage |
|-------|-------|---------|
| `AuthServiceImpl` | 8 | Login (success, wrong email, wrong password, no user-service call), Register (success, duplicate email, user-service fail, password encoding) |
| `AuthController` | 8 | Login body/cookie/no-token-in-body/exception, Logout cookie/stateless, Register success/exception |
| `JwtService` | 4 | Token not blank, correct subject, not expired, correct expiry window |

> Tests dùng **Mockito** + **AssertJ**, không cần Spring context, không cần DB.

---

## Security Notes

### Đã implement

- [x] Password hashing: **BCrypt** (strength 8)
- [x] JWT: **HS256**, expiry 24h, set trong **httpOnly cookie**
- [x] Cookie: `HttpOnly`, `SameSite=Lax`, `Path=/`
- [x] Token **không** trả về trong response body
- [x] Duplicate email check trước khi gọi user-service
- [x] Proper HTTP status codes: `401` sai auth, `409` duplicate, `400` validation
- [x] Actuator endpoint chỉ expose `health` và `info`

### Cần làm trước khi production

- [ ] **Rotate Neon DB password** — đang lộ trong `application-dev.yaml` trong git history
- [ ] Đặt `Cookie.Secure=true` khi dùng HTTPS (hiện đang `false`)
- [ ] Thay `ddl-auto: update` bằng **Flyway migration** (như `exam-service`)
- [ ] Rate limiting trên `/login` để chống brute-force
- [ ] Centralize JWT filter ở **API Gateway** thay vì mỗi service tự verify

---

## Known Limitations

| # | Vấn đề | Ghi chú |
|---|--------|---------|
| 1 | Cookie name không thống nhất | Auth-service set `token`, user-service đọc `access_token`. Exam-service accept cả hai. |
| 2 | Không có refresh token | JWT hết hạn sau 24h, user phải login lại |
| 3 | Không có blacklist token | Logout chỉ xóa cookie phía client, token vẫn hợp lệ cho đến khi hết hạn |
| 4 | `UserServiceErrorDecoder` chưa decode message body | Chỉ map HTTP status, chưa đọc error message từ response body |
