# 🤖 AI Coach Service

AI Coach microservice - Knowledge graph visualization + LLM-powered learning paths.

## Tính năng

- **Knowledge Graph Analysis**: Phân tích hành trình học tập của user
- **LLM Integration**: Tích hợp Claude hoặc Gemini để sinh lộ trình học
- **Topic Explanation**: Giải thích chi tiết từng chủ đề dựa vào trình độ user
- **Mastery Tracking**: Theo dõi mức độ thành thạo (0-100%) của mỗi chủ đề

## Architecture

```
ai-service (port 8085)
├── controllers/
│   └── CoachController.java
├── services/
│   ├── CoachService.java
│   ├── LLMService.java (interface)
│   ├── ClaudeService.java (Claude API implementation)
│   └── GeminiService.java (Gemini API implementation)
├── entities/
│   ├── Topic.java
│   ├── UserTopicMastery.java
│   └── TopicEdge.java
├── repositories/
│   ├── TopicRepository.java
│   ├── UserTopicMasteryRepository.java
│   └── TopicEdgeRepository.java
├── security/
│   ├── JwtService.java
│   └── JwtAuthFilter.java
└── dtos/
    ├── AICoachAnalysisDTO.java
    ├── LearningPathRequest/Response.java
    └── NodeExplanationRequest/Response.java
```

## API Endpoints

### 1. Knowledge Graph Analysis
```
GET /api/coach/{userId}/analysis
```
Trả về: 50 nodes (topics) + 64 edges (relationships)

### 2. Generate Learning Path
```
POST /api/coach/{userId}/learning-path
Body: {
  "daysRemaining": 14,
  "focusTopics": ["topic1", "topic2"]  // optional
}
```
LLM sinh 7-day study plan dựa vào:
- Weak topics (mastery < 70%)
- Prerequisites cần ôn lại
- Thời gian còn lại

Trả về: Lộ trình chi tiết bằng tiếng Việt

### 3. Explain Topic (On-Demand)
```
GET /api/coach/node/{topicId}/explain?userId={userId}
```
LLM giải thích:
- Tại sao user gặp khó khăn với topic này
- Cách tiếp cận hiệu quả
- Prerequisites cần ôn lại
- Ví dụ thực tế

## Setup

### 1. Prerequisites
- Java 21
- Maven 3.9+
- PostgreSQL (Neon serverless)
- Spring Boot 4.0.3

### 2. LLM API Keys
Chọn **một trong hai**:

**Option A: Claude (Recommended)**
```bash
ANTHROPIC_API_KEY=sk-ant-xxxxx
LLM_PROVIDER=claude
```

**Option B: Gemini**
```bash
GEMINI_API_KEY=xxxxx
LLM_PROVIDER=gemini
```

### 3. Environment Variables
```bash
# Database
DB_USERNAME=neondb_owner
DB_PASSWORD=npg_...
SPRING_DATASOURCE_URL=jdbc:postgresql://.../ai_db

# JWT
JWT_SECRET=FizzCoConCaFizzCoConCa

# LLM
ANTHROPIC_API_KEY=sk-ant-...  # or GEMINI_API_KEY
LLM_PROVIDER=claude  # or gemini
```

### 4. Run Service
```bash
cd BE/ai-service
./mvnw spring-boot:run
```

Service sẽ:
1. Register với Eureka (discovery-server:8761)
2. Chạy migrations (V1__create_ai_tables.sql)
3. Expose endpoints tại `http://localhost:8085/api/coach/`

## Database

### Tables

**user_topic_mastery**
- user_id, topic_id, mastery_score (0-100%), error_rate
- Unique constraint: (user_id, topic_id)
- Indexes: user_id, topic_id, mastery_score

**topic_edges**
- from_topic_id → to_topic_id
- relation_type: PREREQUISITE | RELATED
- 64 pre-seeded relationships

**topics**
- Reference table từ exam_service

## Testing

### 1. Health Check
```bash
curl http://localhost:8085/actuator/health
```

### 2. Analysis
```bash
curl http://localhost:8085/api/coach/test-user-1/analysis
```

Expected: 50 nodes + 64 edges

### 3. Learning Path (requires valid LLM API key)
```bash
curl -X POST http://localhost:8085/api/coach/test-user-1/learning-path \
  -H "Content-Type: application/json" \
  -d '{"daysRemaining": 14}'
```

## Integration with Other Services

### exam-service
- Reads: UserTopicMastery data từ ai-service
- Writes: Lưu mastery data khi user submit bài thi

### api-gateway
- Routes `/api/coach/**` → `lb://ai-service`
- Load balances giữa multiple instances (nếu có)

## Performance Notes

- Knowledge graph building: O(n) topics + O(m) edges
- Mastery calculation: Optimized với Map lookup (3 queries thay vì 51)
- LLM calls: Có thể cache kết quả trong UserCoachCache (TODO)

## Known Limitations

1. **LLM API Cost**: Mỗi learning path + explanation = 2 API calls. Nên implement caching.
2. **Vietnamese Output**: Prompts hard-coded bằng tiếng Việt. Cần i18n cho multi-language.
3. **No Async**: LLM calls đang synchronous. Nên dùng @Async hoặc Kafka cho production.

## Next Steps

- [ ] Implement UserCoachCache entity + caching logic
- [ ] Add @Async for LLM calls (non-blocking)
- [ ] Implement graph traversal algorithms (BFS/DFS) cho prerequisite chains
- [ ] Add test suite (JUnit + Testcontainers)
- [ ] Frontend integration (react-flow visualization)

## Files Structure

```
ai-service/
├── pom.xml
├── Dockerfile
├── README.md
├── src/main/java/com/edu/ai/
│   ├── AIServiceApplication.java
│   ├── controllers/
│   ├── services/
│   ├── entities/
│   ├── repositories/
│   ├── security/
│   ├── config/
│   └── dtos/
├── src/main/resources/
│   ├── application.yml
│   └── db/migration/
│       └── V1__create_ai_tables.sql
└── src/test/
```

---

**Created**: 2026-05-17  
**Status**: Phase 2 (LLM Integration) - First working version
