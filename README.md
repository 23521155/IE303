# TestWebsite Backend (Spring Boot)

Backend API cho ứng dụng thi trắc nghiệm, gồm các service: **User/Auth**, **Exam/Certification**, **Question**, **Learning Material**, **Result**.

## Yêu cầu

- JDK 21+
- Maven 3.8+
- Spring Boot 4.0.x

## Cấu trúc API

| Service | Base path | Mô tả |
|--------|-----------|--------|
| Auth | `POST /api/auth/register`, `POST /api/auth/login` | Đăng ký, đăng nhập (JWT) |
| Exam | `GET/POST/PUT/DELETE /api/exams`, `GET /api/exams/{id}` | Quản lý đề thi / chứng chỉ |
| Question | `GET/POST/PUT/DELETE /api/exams/{examId}/questions` | Câu hỏi theo đề thi |
| Material | `GET/POST/PUT/DELETE /api/materials` | Tài liệu học tập |
| Result | `GET /api/results/me`, `GET /api/results/{id}`, `POST /api/exams/{examId}/submit` | Kết quả thi, nộp bài |

## Chạy ứng dụng

```bash
cd BE
mvn spring-boot:run
```

- API: http://localhost:8080
- H2 Console (dev): http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:testdb`, user: `sa`, password trống)

## Cấu hình

- `application.yml`: H2, JWT, CORS.
- `application-prod.yml`: PostgreSQL (set `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `JWT_SECRET`).

## Bảo mật

- Các endpoint `/api/auth/*` không cần token.
- Các endpoint `/api/**` còn lại yêu cầu header: `Authorization: Bearer <token>` (sau khi login).
- Kết quả thi (`/api/results/me`, `/api/results/{id}`) chỉ trả về theo user đang đăng nhập.

## Ví dụ gọi API

**Đăng ký:**
```http
POST /api/auth/register
Content-Type: application/json

{"fullName":"Nguyen Van A","email":"a@test.com","password":"123456","phone":"0901234567"}
```

**Đăng nhập:**
```http
POST /api/auth/login
Content-Type: application/json

{"email":"a@test.com","password":"123456"}
```

**Lấy danh sách đề thi (cần token):**
```http
GET /api/exams?category=english
Authorization: Bearer <accessToken>
```

**Nộp bài (cần token):**
```http
POST /api/exams/1/submit
Authorization: Bearer <accessToken>
Content-Type: application/json

{"answers":{"1":0,"2":2,"3":1}}
```
(`answers`: map questionId -> index đáp án chọn, 0-based)
