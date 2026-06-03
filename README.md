# IT Shiken

Nền tảng học tập và luyện thi trực tuyến chứng chỉ IT Nhật Bản (IT Passport, FE, AP...).

**Website:** [https://itshiken.io.vn/vi](https://itshiken.io.vn/vi)

## Tính năng

- **Thi online:** câu hỏi trắc nghiệm, theo dõi thời gian làm bài và chấm điểm.
- **Tài liệu học tập:** kho tài liệu, xem trực tuyến và tải về.
- **Flashcard:** ôn tập kiến thức nhanh theo thẻ.
- **Blog:** bài viết chia sẻ, hướng dẫn ôn luyện.
- **Trợ lý AI (RAG + LLM):** hỏi đáp, gợi ý học tập và sinh nội dung dựa trên tài liệu.
- **Xác thực & phân quyền:** đăng ký / đăng nhập.
- **Đa ngôn ngữ (i18n):** hỗ trợ 3 ngôn ngữ (Việt, Anh, Nhật).

## Kiến trúc hệ thống

Hệ thống được xây dựng theo kiến trúc Microservices với Spring Boot cho Backend và Next.js cho Frontend.
```
                ┌─────────────┐
                │  Frontend   │  Next.js (3000)
                └──────┬──────┘
                       │  
                       ▼
                ┌─────────────┐
                │ API Gateway │  Spring Cloud Gateway (8080)
                └──────┬──────┘
                       │  
        ┌──────────────┼───────────────┬───────────────┬──────────────┐
        ▼              ▼               ▼               ▼              ▼
  auth-service   user-service    exam-service   material-service  ai-service
    (8081)         (8082)          (8084)          (8083)          (8085)
        └──────────────┴───────────────┴───────────────┴──────────────┘
                       │  
                       ▼
                ┌─────────────┐
                │  Discovery  │  Eureka (8761)
                └─────────────┘
```
*Lưu ý: Database sử dụng PostgreSQL (Neon serverless) — mỗi service kết nối đến một database độc lập.*

### Danh sách Services

| Service | Port | Vai trò |
| :--- | :--- | :--- |
| **discovery_server** | `8761` | Eureka registry — quản lý đăng ký của các service. |
| **api_gateway** | `8080` | Cổng vào duy nhất, định tuyến `/api/**` tới các service. |
| **auth_service** | `8081` | Đăng ký / đăng nhập / phát JWT (httpOnly cookie). |
| **user_service** | `8082` | Quản lý hồ sơ người dùng. |
| **exam_service** | `8084` | Quản lý đề thi, câu hỏi, danh mục, lượt làm bài, đánh giá. |
| **material_service**| `8083` | Cung cấp tài liệu học, serve file PDF. |
| **ai_service** | `8085` | RAG + sinh nội dung qua LLM (Claude / Gemini). |

## Cấu trúc thư mục chính

```text
IE303/
├── BE/                      # Backend (Maven multi-module)
│   ├── docker-compose.yml
│   ├── .env.example
│   ├── discovery_server/    # Port 8761
│   ├── api_gateway/         # Port 8080
│   ├── auth_service/        # Port 8081
│   ├── user_service/        # Port 8082
│   ├── material_service/    # Port 8083
│   ├── exam-service/        # Port 8084
│   └── ai-service/          # Port 8085
├── FE/                      # Frontend Next.js
└── Data/                    # Dữ liệu mẫu (câu hỏi, topic mapping…)
```

## Yêu cầu môi trường

* **Docker & Docker Compose** (hoặc Docker Desktop).
* **Node.js 18+** (dành cho Frontend).
* **PostgreSQL** có sẵn các database: `auth_db`, `user_db`, `material_db`, `exam_db`, `ai_db`.
* **API Key** của Anthropic (Claude) hoặc Google (Gemini) nếu sử dụng AI Service.

## Hướng dẫn chạy dự án

### Tải mã nguồn

```bash
git clone https://github.com/23521155/IE303.git
cd IE303
```

### Backend

**Bước 1: Thiết lập biến môi trường**
```bash
cd BE
cp .env.example .env
```

Mở file `BE/.env` và điền các thông tin kết nối Database, JWT Secret, và API Key (xem chi tiết ở mục Biến môi trường).

**Bước 2: Build và khởi chạy**

```bash
docker compose up --build -d
```

*Compose sẽ khởi động theo thứ tự: `discovery_server` lên trước, sau đó các service còn lại tự động đăng ký vào Eureka.*

**Bước 3: Kiểm tra**

* **Eureka dashboard:** `http://localhost:8761` (đảm bảo các service trạng thái UP).
* **API Gateway:** `http://localhost:8080` (Ví dụ test: `GET http://localhost:8080/api/exams`).

### Frontend (Next.js)

Frontend chạy trực tiếp bằng Node.js.

```bash
cd FE
npm install

# Tạo file .env và cấu hình
echo -e "BE_URL=http://localhost:8080\nNEXT_PUBLIC_APP_URL=http://localhost:3000" > .env

# Chạy môi trường dev
npm run dev 
```

*Truy cập ứng dụng tại:* `http://localhost:3000`

## Biến môi trường (.env)

### Backend (`BE/.env`)

| Biến |  Mô tả |
| --- | --- |
| `JWT_SECRET` | Khóa ký JWT (HS256), chuỗi ngẫu nhiên ≥ 32 ký tự
| `ALLOWED_ORIGINS` | Domain của frontend để xử lý CORS (VD: `http://localhost:3000`). |
| `DB_USERNAME` | Tài khoản truy cập PostgreSQL. |
| `DB_PASSWORD` | Mật khẩu truy cập PostgreSQL. |
| `AUTH_DB_URL` | JDBC URL cho auth_db (VD: `jdbc:postgresql://<host>/auth_db?sslmode=require`). |
| `USER_DB_URL` | JDBC URL cho user_db. |
| `MATERIAL_DB_URL` | JDBC URL cho material_db. |
| `EXAM_DB_URL` | JDBC URL cho exam_db. |
| `AI_DB_URL` | JDBC URL cho ai_db. |
| `LLM_PROVIDER` | `gemini` hoặc `claude`. |
| `GEMINI_API_KEY` | API key tương ứng nếu chọn provider Gemini. |
| `ANTHROPIC_API_KEY` | API key tương ứng nếu chọn provider Claude. |
