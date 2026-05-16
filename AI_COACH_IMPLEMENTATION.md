# AI Coach Implementation Plan — 2 Tuần

## 📋 Tổng quan

**Mục tiêu**: Xây dựng AI Coach — trợ lý cá nhân phân tích hành trình học tập tích lũy của user dựa trên Knowledge Graph và exam history.

**Scope MVP**: 1 exam (IT Passport), 50 topics, integrated vào Profile page.

**Timeline**: 14 ngày (7 ngày BE + 7 ngày FE + integration + test)

---

## 🎨 Frontend Workflow

### 1. Vị trí & Navigation

#### URL Structure
```
/profile                      ← User profile main page
├── /profile/coach            ← AI Coach dashboard (redirect → /graph)
│   ├── /profile/coach/graph  ← Knowledge Graph view
│   ├── /profile/coach/path   ← Learning Path recommendation
│   └── /profile/coach/insights ← Trends & predictions
```

#### Sidebar Navigation
Thêm section "AI Coach" vào Profile layout:
```
// FE/src/app/profile/layout.tsx

<Sidebar>
  <SidebarItem href="/profile" icon="👤">Thông tin</SidebarItem>
  <SidebarItem href="/profile/history" icon="📜">Lịch sử thi</SidebarItem>
  <SidebarItem href="/profile/flashcards" icon="🎴">Flashcards</SidebarItem>
  
  {/* NEW SECTION */}
  <SidebarSection title="AI Coach">
    <SidebarItem href="/profile/coach/graph" icon="🤖">Knowledge Graph</SidebarItem>
    <SidebarItem href="/profile/coach/path">Learning Path</SidebarItem>
    <SidebarItem href="/profile/coach/insights">Insights</SidebarItem>
  </SidebarSection>
</Sidebar>
```

### 2. Trang `/profile/coach/graph` — Knowledge Graph

#### Component Structure
```
FE/src/app/profile/coach/
├── layout.tsx                              ← sub-layout + tab nav
├── graph/
│   ├── page.tsx                            ← page wrapper
│   └── KnowledgeGraphView.tsx              ← main component
│       ├── GraphCanvas.tsx                 ← react-flow render
│       ├── NodeDetail.tsx                  ← sidebar: topic info
│       └── RefreshButton.tsx               ← refresh analysis
└── ...
```

#### Data Flow
```
User visits /profile/coach/graph
        ↓
1. Page load: GET /api/coach/me/analysis
        ↓
2. API Response:
   {
     graph: {
       nodes: [ {id, label, category, masteryScore, color} ],
       edges: [ {source, target, relation} ]
     },
     insights: { weakTopics, strongTopics, trend },
     generatedAt: timestamp,
     cacheValid: boolean
   }
        ↓
3. FE render:
   - React-flow: display graph
   - Color node: 🟢 >80% | 🟡 40-80% | 🔴 <40%
   - Hover: show topic detail + related materials
   - Click node: sidebar show prerequisites + materials
        ↓
4. (Optional) Click "🔄 Phân tích lại":
   - POST /api/coach/me/analysis/refresh
   - Show "Agent đang phân tích..."
   - Stream steps via Server-Sent Events (SSE)
```

#### React-Flow Example
```jsx
// FE/src/components/coach/GraphCanvas.tsx

const nodes = [
  { id: '1', data: { label: 'Network' }, position: { x: 0, y: 0 }, 
    style: { background: '#22c55e' } }, // ✅ strong
  { id: '2', data: { label: 'TCP/IP' }, position: { x: 100, y: 0 },
    style: { background: '#22c55e' } },
  { id: '3', data: { label: 'Subnetting' }, position: { x: 200, y: 0 },
    style: { background: '#eab308' } }, // 🟡 medium
  { id: '4', data: { label: 'CIDR' }, position: { x: 300, y: 0 },
    style: { background: '#ef4444' } }, // 🔴 weak
];

const edges = [
  { id: 'e1-2', source: '1', target: '2', label: 'PREREQUISITE' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
];

return <ReactFlow nodes={nodes} edges={edges} />;
```

### 3. Trang `/profile/coach/path` — Learning Path

#### Component
```
FE/src/app/profile/coach/path/
├── page.tsx
└── LearningPathView.tsx
    ├── WeeklyPlan.tsx           ← weekly breakdown
    ├── DayCard.tsx              ← each day task
    └── MaterialCard.tsx         ← material link
```

#### Display Format
```
📚 LỘ TRÌNH ĐỀ XUẤT

Mục tiêu: Master Subnetting + CIDR trong 7 ngày

T2 — Subnetting Basics
  📄 PDF: "Subnetting 101" (15 phút)
  🎴 5 flashcard mới
  [ Bắt đầu ]

T3 — Subnetting Tính
  📝 Quiz 10 câu (Subnetting)
  [ Làm bài ]

... (T4-T6 tương tự)

T7 — Mini Test
  📝 20 câu mix topic
  [ Làm bài ]
```

**Data từ API**:
```json
{
  "learningPath": [
    {
      "day": 1,
      "topicId": "subnetting",
      "topicName": "Subnetting Basics",
      "materials": [
        { "id": "m1", "type": "pdf", "title": "Subnetting 101", "duration": 15 }
      ],
      "flashcards": [
        { "id": "fc1", "question": "...", "answer": "..." }
      ]
    },
    ...
  ]
}
```

### 4. Trang `/profile/coach/insights` — AI Insights

#### Display
```
🔍 INSIGHTS — Phân tích 30 ngày gần nhất

📈 Tiến độ: +18% mastery

⏰ Giờ học hiệu quả nhất: 20:00-22:00

📉 Chủ đề giảm sút: Database (14 ngày chưa ôn)

🏆 Đã thành thạo: 12/45 topic

🎯 AI dự đoán: nếu giữ pace, bạn sẵn sàng thi trong 6-8 tuần
```

---

## 🔧 Backend Implementation

### 1. Architecture Overview

#### Service Layout
```
BE/
├── api_gateway/                      ← route /coach/** → ai_service
├── ai_service/                       ← SERVICE MỚI
│   ├── src/main/java/com/exam/ai/
│   │   ├── controller/
│   │   │   └── CoachController.java
│   │   ├── service/
│   │   │   ├── CoachAnalysisService.java
│   │   │   ├── KnowledgeGraphService.java
│   │   │   └── LLMAgentService.java
│   │   ├── dto/
│   │   │   ├── AnalysisRequest.java
│   │   │   ├── AnalysisResponse.java
│   │   │   └── GraphDTO.java
│   │   ├── entity/
│   │   │   ├── Topic.java
│   │   │   ├── TopicEdge.java
│   │   │   ├── UserTopicMastery.java
│   │   │   └── UserCoachCache.java
│   │   ├── repository/
│   │   │   ├── TopicRepository.java
│   │   │   ├── UserTopicMasteryRepository.java
│   │   │   └── UserCoachCacheRepository.java
│   │   └── client/
│   │       ├── ExamServiceClient.java    ← REST to exam_service
│   │       └── MaterialServiceClient.java ← REST to material_service
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── db/migration/
│   │       ├── V1__create_topic_tables.sql
│   │       └── V2__create_user_mastery.sql
│   └── pom.xml
├── exam_service/                     ← update callback endpoint
├── material_service/                 ← no change
└── discovery_server/                 ← register ai_service
```

### 2. Endpoints

#### Main API

```
GET /api/coach/me/analysis
  描述: Lấy phân tích tổng thể (với cache 24h)
  Auth: Required (JWT)
  Response: {
    graph: { nodes, edges },
    insights: { weakTopics, strongTopics, trend, prediction },
    learningPath: [ {day, topicId, materials, flashcards} ],
    generatedAt: timestamp,
    cacheValid: true|false
  }

POST /api/coach/me/analysis/refresh
  描述: Force re-run agent (invalidate cache)
  Auth: Required
  Response: SSE stream (streaming steps)
  Content-Type: text/event-stream
  
  Example stream:
  event: step
  data: {"step": "Đang đọc kết quả thi..."}
  
  event: step
  data: {"step": "Đang traverse graph..."}
  
  event: complete
  data: {"graph": {...}, "insights": {...}}

POST /api/coach/event/exam-completed
  描述: Internal endpoint — exam_service gọi khi user submit bài
  Auth: Service-to-service (API key)
  Body: { userId, examSessionId, score, wrongQuestionIds }
  Logic: Update user_topic_mastery, invalidate cache
```

#### Gateway Routes

```yaml
# BE/api_gateway/src/main/resources/application.yml

spring:
  cloud:
    gateway:
      routes:
        - id: coach-route
          uri: lb://ai-service
          predicates:
            - Path=/api/coach/**
          filters:
            - StripPrefix=1
```

### 3. Database Schema

#### Tables

```sql
-- 1. Topic graph (global, không per-user)
CREATE TABLE topic (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),        -- "Networking", "Database", etc
    exam_type VARCHAR(50),         -- "IT_PASSPORT"
    level INT,                     -- 1=basic, 2=intermediate, 3=advanced
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(exam_type, name)
);

-- 2. Edges between topics (prerequisite, related, part_of)
CREATE TABLE topic_edge (
    id UUID PRIMARY KEY,
    from_topic_id UUID NOT NULL REFERENCES topic(id),
    to_topic_id UUID NOT NULL REFERENCES topic(id),
    relation_type VARCHAR(50),    -- "PREREQUISITE", "RELATED", "PART_OF"
    UNIQUE(from_topic_id, to_topic_id, relation_type)
);

-- 3. User mastery tracking (updated after each exam)
CREATE TABLE user_topic_mastery (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    topic_id UUID NOT NULL REFERENCES topic(id),
    mastery_score DECIMAL(3,2),   -- 0.0-1.0
    attempts_count INT DEFAULT 0,
    correct_count INT DEFAULT 0,
    last_practiced_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, topic_id),
    INDEX idx_user_id (user_id),
    INDEX idx_topic_id (topic_id)
);

-- 4. Cache LLM analysis results (avoid re-running expensive agent)
CREATE TABLE user_coach_cache (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    analysis_json JSONB NOT NULL, -- {graph, insights, path}
    exam_count_at_generation INT,  -- invalidate if user exam count changes
    generated_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,           -- 24h from now
    INDEX idx_user_id (user_id)
);

-- 5. Index for faster queries
CREATE INDEX idx_mastery_user_score 
    ON user_topic_mastery(user_id, mastery_score DESC);
```

### 4. Core Services

#### CoachAnalysisService.java
```java
@Service
public class CoachAnalysisService {
    
    // 1. Get or compute analysis
    public AnalysisResponse getAnalysis(UUID userId) {
        // Check cache first
        UserCoachCache cache = cacheRepo.findByUserId(userId);
        if (cache != null && !cache.isExpired()) {
            return cache.toResponse();
        }
        
        // Compute new analysis
        return computeAnalysis(userId);
    }
    
    private AnalysisResponse computeAnalysis(UUID userId) {
        // 2. Fetch user data
        List<UserTopicMastery> masteries = masteryRepo.findByUserId(userId);
        List<ExamSession> examSessions = examClient.getRecentSessions(userId, 30);
        
        // 3. Build graph
        GraphDTO graph = graphService.buildUserGraph(masteries);
        
        // 4. Run LLM agent
        AgentResult agentResult = llmAgentService.analyze(userId, masteries, examSessions);
        
        // 5. Cache result
        cache(userId, agentResult);
        
        return new AnalysisResponse(graph, agentResult.insights, agentResult.path);
    }
    
    // 6. Update mastery after exam
    public void updateMasteryAfterExam(UUID userId, ExamResult result) {
        for (Question q : result.questions) {
            UserTopicMastery mastery = masteryRepo.findByUserAndTopic(userId, q.topicId);
            if (mastery == null) {
                mastery = new UserTopicMastery(userId, q.topicId);
            }
            mastery.addAttempt(q.isCorrect);
            mastery.setLastPracticedAt(now());
            masteryRepo.save(mastery);
        }
        
        // Invalidate cache
        cacheRepo.deleteByUserId(userId);
    }
}
```

#### LLMAgentService.java (Spring AI)
```java
@Service
public class LLMAgentService {
    
    @Autowired
    private ChatClient chatClient;
    
    public AgentResult analyze(UUID userId, List<UserTopicMastery> masteries, 
                               List<ExamSession> sessions) {
        // 1. Build tools
        var tools = List.of(
            Tool.function("getWeakTopics")
                .description("Get topics where user scored < 60%")
                .handler(ctx -> getWeakTopics(masteries)),
            
            Tool.function("searchMaterials")
                .description("Find PDF/video for given topics")
                .handler(ctx -> materialClient.search(ctx.param("topicIds"))),
            
            Tool.function("generateLearningPath")
                .description("Create 7-day study plan")
                .handler(ctx -> generatePath(masteries, ctx.param("topicIds")))
        );
        
        // 2. System prompt
        String systemPrompt = """
            You are an AI tutor analyzing a student's exam history.
            Use the tools to:
            1. Identify weak topics (< 60% mastery)
            2. Find prerequisite topics (must learn before)
            3. Search relevant materials
            4. Create a 7-day learning plan
            
            Respond in Vietnamese. Be encouraging but honest.
            """;
        
        // 3. User message with context
        String userMessage = String.format("""
            Analyze this student's progress:
            - Total attempts: %d
            - Avg score: %.1f%%
            - Last 5 exams: [%s]
            
            Create a learning path focusing on weak topics.
            """, sessions.size(), getAvgScore(sessions), formatScores(sessions));
        
        // 4. Call LLM with tool use
        var response = chatClient.prompt()
            .system(systemPrompt)
            .user(userMessage)
            .tools(tools)
            .call()
            .content();
        
        // 5. Parse response
        return parseAgentResponse(response);
    }
}
```

### 5. Integration with exam_service

#### After exam submit, call ai_service:
```java
// BE/exam_service/src/main/java/.../ExamController.java

@PostMapping("/exams/sessions/{id}/submit")
public void submitExam(@PathVariable UUID id) {
    // ... existing exam logic ...
    
    // NEW: Notify ai_service
    aiServiceClient.notifyExamCompleted(
        new ExamCompletedEvent(
            userId, 
            sessionId, 
            result.getScore(),
            result.getWrongQuestionIds()
        )
    );
}
```

---

## 📋 Điều kiện & Prerequisites

### 1. Data Prerequisites

| Yêu cầu | Hiện tại | Cần làm | Timeline |
|---|---|---|---|
| **Question có topic_id** | ❓ Cần check | Nếu chưa → update schema + populate | 2 ngày |
| **IT Passport syllabus** | ❌ Chưa có | Build/find + seed 50 topics vào topic table | 2 ngày |
| **Question-topic mapping** | ❓ Cần check | Nếu chưa → map existing questions | 1 ngày |
| **Material data** | ✅ Có (material-service) | Đã có, không cần làm thêm | — |

**ACTION**: Kiểm tra `exam_service` DB ngay để xác định cần setup bao nhiêu data.

### 2. Infrastructure

| Item | Status | Cần làm |
|---|---|---|
| **PostgreSQL + pgvector** | ✅ Có (Neon) | Enable pgvector extension: `CREATE EXTENSION vector;` |
| **LLM API** | ❌ Chưa có | Đăng ký OpenAI/Claude/Gemini account + get API key |
| **Spring AI dependency** | ❌ Chưa add | Add `spring-ai-anthropic` or `spring-ai-google-genai` to pom.xml |
| **react-flow library** | ❌ Chưa add | `npm install @xyflow/react` |

### 3. API Keys & Config

```yaml
# BE/ai_service/src/main/resources/application.yml

spring:
  ai:
    anthropic:
      api-key: ${ANTHROPIC_API_KEY}  # Set in .env or deploy env
      model: claude-3-5-haiku
    # OR
    google:
      gemini:
        api-key: ${GEMINI_API_KEY}
        model: gemini-2.0-flash

server:
  port: 8085  # Choose unused port

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka  # discovery_server
```

### 4. Skills & Knowledge Needed

| Area | Learning curve | Resources |
|---|---|---|
| **Spring AI basics** | 2-3h | Spring AI docs + few examples |
| **React-flow** | 2-3h | react-flow tutorial |
| **Knowledge graphs** | 1h | Basic BFS/DFS traversal |
| **LLM prompting** | 1-2h | Trial & error + Claude cookbook |
| **Server-Sent Events (SSE)** | 1h | Simple Spring ResponseBodyEmitter |

### 5. Files to Check Before Starting

```bash
# 1. Check question schema
SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME='question' AND COLUMN_NAME LIKE '%topic%';

# 2. Check exam_service API
GET http://localhost:8080/api/exams/sessions/{id}  # response structure?

# 3. Check material-service API
GET http://localhost:8080/api/materials  # does it have topic filter?

# 4. Current FE profile structure
ls -la FE/src/app/profile/
```

---

## 📅 14-Day Plan (Revised)

### Week 1 — Backend Core

| Day | Task | Files | Status |
|---|---|---|---|
| 1 | DB schema + seed IT Passport topics (50) | V1__*.sql, Topic.java | | 
| 2 | ai_service skeleton + Eureka register | pom.xml, config | |
| 3 | Endpoint: POST /event/exam-completed + update mastery | ExamEventListener.java | |
| 4 | Knowledge graph service (traverse, build DTO) | KnowledgeGraphService.java | |
| 5 | LLM agent service (Spring AI + 3 tools) | LLMAgentService.java | |
| 6 | Endpoint: GET /analysis (with cache) | CoachController.java | |
| 7 | Endpoint: POST /analysis/refresh (SSE stream) | CoachController.java | |

### Week 2 — Frontend + Integration

| Day | Task | Files | Status |
|---|---|---|---|
| 8 | Profile layout + sidebar | profile/layout.tsx | |
| 9 | Graph page + react-flow component | coach/graph/page.tsx | |
| 10 | Path page + day cards | coach/path/page.tsx | |
| 11 | Insights page + charts | coach/insights/page.tsx | |
| 12 | Hook exam result → redirect to coach | exam/result/page.tsx | |
| 13 | Edge cases + error handling | all pages | |
| 14 | Polish + demo prep | integration test | |

---

## 🚀 Khởi động (Day 0)

1. **Confirm data status** — check if question.topic_id exists
2. **Setup API keys** — create OpenAI/Gemini account
3. **Create feature branch** — `git checkout -b feature/ai-coach`
4. **Scaffold ai_service** — Spring Boot starter template

---

## 📞 Liên hệ nếu cần clarify

- Cần thiết kế LLM prompt chi tiết hơn?
- Cần ERD diagram cho DB schema?
- Cần code example cho react-flow setup?
