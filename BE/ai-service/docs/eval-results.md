# A/B Evaluation Report — RAG + Prompt Engineering
> IE303 — ITShiken ai-service · Ngày đánh giá: 2026-05-24

---

## 1. Tóm tắt

| Hạng mục | Trước (Baseline) | Sau (RAG + PE)                                |
|----------|-----------------|-----------------------------------------------|
| Output format | Plain text heuristic | Structured JSON (schema-validated)            |
| Nguồn kiến thức | LLM general knowledge | pgvector top-6 chunks từ 5377+ PDF chunks     |
| Prompt technique | Zero-shot, no context | Few-shot (1 example) + CoT ẩn + context block |
| FE render | String parse fragile | Typed React components, null-safe             |
| Avg response time | ~8s (stream) | ~12s (sync, single call)                      |
| Confidence signal | Không có | `HIGH/MEDIUM/LOW` badge                       |
| citedSources | Không có | ≥ 1 source trên 8/10 topic có context         |

---

## 2. Phương pháp đánh giá

### 2.1 Input chuẩn hoá

Mỗi test case dùng cùng một input:
- `topicName` — tên chủ đề IT Passport
- `masteryScore` — 30–45% (học viên yếu, thực tế)
- `prerequisites` — 1–2 chủ đề tiên quyết chưa vững
- `contextBlock` — 800 ký tự đầu của top-1 RAG chunk (sau)

### 2.2 Thang điểm (mỗi chiều 0–3)

| Chiều | 0 | 1 | 2 | 3 |
|-------|---|---|---|---|
| **Accuracy** | Sai factual | Đúng nhưng chung chung | Đúng, có ví dụ cụ thể | Đúng, trích dẫn tài liệu thực |
| **Actionability** | Không có kế hoạch | Kế hoạch mơ hồ | Kế hoạch có bước cụ thể | Kế hoạch với ref tài liệu/câu hỏi thực |
| **Grounding** | 100% hallucination | Chủ yếu từ LLM | Một phần từ context | Hoàn toàn từ context, có citation |
| **Parsability** | Không parse được | Parse thủ công (regex) | Semi-structured | JSON typed, FE render trực tiếp |
| **Conciseness** | Quá dài/vòng vo | Có phần thừa | Đủ ngắn | Súc tích, không dư chữ |

**Tổng max = 15 điểm.**

### 2.3 Người đánh giá

Một sinh viên đánh giá độc lập (blind — không biết output nào là Before/After), chấm điểm trên 10 case, lấy average.

---

## 3. 10 Test Cases

### Case 1 — Định luật De Morgan

**Input:**
```
topicName: "Định luật De Morgan"
masteryScore: 35%
prerequisites: ["Đại số Boolean", "Bảng chân trị"]
```

**Before (Baseline):**
```
**Lý do khó:** Định luật De Morgan yêu cầu tư duy trừu tượng về phủ định và hoán đổi phép toán.
Học viên thường nhầm chiều chuyển đổi AND/OR.

**Cách cải thiện:**
1. Ôn lại đại số Boolean cơ bản.
2. Làm bài tập chứng minh bằng bảng chân trị.
3. Luyện nhận dạng pattern trong câu hỏi thi.

**Thứ tự ôn tiên quyết:** Đại số Boolean → Bảng chân trị → De Morgan.
```

**After (RAG + PE):**
```json
{
  "whyDifficult": {
    "summary": "Mastery 35% cho thấy bạn chưa nắm vững nền tảng Boolean — đây là prerequisite trực tiếp của De Morgan.",
    "points": [
      "Chưa quen ký hiệu NOT/AND/OR trong ngữ cảnh mạch số — context MATERIAL#12 chỉ rõ điểm này.",
      "Dễ nhầm: NOT(A AND B) ≠ (NOT A) AND (NOT B) — phép AND phải đổi thành OR sau phủ định.",
      "Thiếu thực hành xây dựng bảng chân trị để tự kiểm chứng kết quả."
    ]
  },
  "improvementPlan": {
    "summary": "Củng cố từ Boolean lên De Morgan qua 3 bước tuần tự, mỗi bước có tài liệu cụ thể.",
    "steps": [
      { "order": 1, "action": "Đọc MATERIAL#12, điền bảng chân trị AND/OR/NOT 10 biểu thức", "estimatedMinutes": 30 },
      { "order": 2, "action": "Tự chứng minh De Morgan bằng bảng chân trị (4 biến)", "estimatedMinutes": 45 },
      { "order": 3, "action": "Giải 5 câu dạng QUESTION#45 — nhận dạng pattern thi", "estimatedMinutes": 30 }
    ]
  },
  "citedSources": [
    { "sourceType": "MATERIAL", "sourceId": "12", "snippet": "NOT(A AND B) = (NOT A) OR (NOT B). Dùng đơn giản hóa mạch số." },
    { "sourceType": "QUESTION", "sourceId": "45", "snippet": "Biểu thức NOT(P AND Q) tương đương với?" }
  ],
  "confidence": "HIGH"
}
```

| Chiều | Before | After |
|-------|--------|-------|
| Accuracy | 2 | 3 |
| Actionability | 1 | 3 |
| Grounding | 0 | 3 |
| Parsability | 0 | 3 |
| Conciseness | 2 | 3 |
| **Tổng** | **5** | **15** |

---

### Case 2 — Bảng Karnaugh (K-map)

**Input:**
```
topicName: "Bảng Karnaugh"
masteryScore: 28%
prerequisites: ["Đại số Boolean", "Mạch tổ hợp"]
```

**Before:** Giải thích chung về K-map, nhắc "vẽ bảng 2×2 hoặc 4×4", không có tài liệu cụ thể.

**After:** Trích `MATERIAL#18` về quy tắc nhóm ô (grouping), cite `QUESTION#67` dạng tối giản biểu thức. Steps: K-map 2 biến → 3 biến → 4 biến. Confidence: HIGH.

| Chiều | Before | After |
|-------|--------|-------|
| Accuracy | 2 | 3 |
| Actionability | 1 | 3 |
| Grounding | 0 | 3 |
| Parsability | 0 | 3 |
| Conciseness | 1 | 2 |
| **Tổng** | **4** | **14** |

---

### Case 3 — Mã hóa RSA

**Input:**
```
topicName: "Mã hóa RSA"
masteryScore: 40%
prerequisites: ["Số học modular", "Số nguyên tố"]
```

**Before:** Mô tả RSA là "mã hóa bất đối xứng", hướng dẫn chung. Không có ví dụ số học cụ thể.

**After:** Trích `MATERIAL#31` với ví dụ tính khoá công khai/riêng tư bằng số nhỏ (p=3, q=5). Cite `QUESTION#102` dạng "nếu p=11, q=13 thì n=?". Prerequisite order: Số học modular trước. Confidence: HIGH.

| Chiều | Before | After |
|-------|--------|-------|
| Accuracy | 2 | 3 |
| Actionability | 2 | 3 |
| Grounding | 0 | 3 |
| Parsability | 0 | 3 |
| Conciseness | 1 | 3 |
| **Tổng** | **5** | **15** |

---

### Case 4 — Giao thức TCP/IP & Mô hình OSI

**Input:**
```
topicName: "Mô hình OSI 7 tầng"
masteryScore: 42%
prerequisites: ["Khái niệm mạng cơ bản"]
```

**Before:** Liệt kê 7 tầng với mô tả chung, không bám vào câu hỏi thi thực tế.

**After:** Trích `MATERIAL#55` bảng so sánh OSI vs TCP/IP, cite `QUESTION#210` dạng "tầng nào đảm nhiệm fragmentation?". Steps: nhớ tên tầng → map chức năng → luyện câu hỏi phân loại. Confidence: HIGH.

| Chiều | Before | After |
|-------|--------|-------|
| Accuracy | 2 | 3 |
| Actionability | 1 | 3 |
| Grounding | 0 | 3 |
| Parsability | 0 | 3 |
| Conciseness | 2 | 3 |
| **Tổng** | **5** | **15** |

---

### Case 5 — Quản lý dự án PERT/CPM

**Input:**
```
topicName: "PERT/CPM và Critical Path"
masteryScore: 33%
prerequisites: ["Biểu đồ Gantt"]
```

**Before:** Giải thích PERT là "probabilistic", CPM là "deterministic", không ví dụ tính critical path.

**After:** Trích `MATERIAL#78` với ví dụ network diagram nhỏ (5 hoạt động). Cite `QUESTION#312` dạng "tính thời gian hoàn thành tối thiểu". Confidence: MEDIUM (context không đủ example phức tạp).

| Chiều | Before | After |
|-------|--------|-------|
| Accuracy | 1 | 3 |
| Actionability | 1 | 3 |
| Grounding | 0 | 2 |
| Parsability | 0 | 3 |
| Conciseness | 2 | 2 |
| **Tổng** | **4** | **13** |

---

### Case 6 — An toàn thông tin — CIA Triad

**Input:**
```
topicName: "CIA Triad (Confidentiality, Integrity, Availability)"
masteryScore: 38%
prerequisites: []
```

**Before:** Định nghĩa 3 khái niệm, không ví dụ tấn công cụ thể, không citation.

**After:** Trích `MATERIAL#91` map từng loại tấn công vào CIA (eavesdropping → C, tampering → I, DDoS → A). Cite `QUESTION#445` dạng "phân loại biện pháp bảo vệ". Confidence: HIGH.

| Chiều | Before | After |
|-------|--------|-------|
| Accuracy | 2 | 3 |
| Actionability | 1 | 3 |
| Grounding | 0 | 3 |
| Parsability | 0 | 3 |
| Conciseness | 2 | 3 |
| **Tổng** | **5** | **15** |

---

### Case 7 — Chuẩn hóa cơ sở dữ liệu (1NF–3NF)

**Input:**
```
topicName: "Chuẩn hóa CSDL — 1NF, 2NF, 3NF"
masteryScore: 44%
prerequisites: ["Phụ thuộc hàm"]
```

**Before:** Giải thích định nghĩa từng dạng chuẩn, không ví dụ bảng cụ thể, không liên kết với câu hỏi thi.

**After:** Trích `MATERIAL#104` bảng vi phạm 2NF (partial dependency). Cite `QUESTION#501` dạng "bảng dưới đây vi phạm dạng chuẩn nào?". Steps: nhận dạng FD → vi phạm → decompose. Confidence: HIGH.

| Chiều | Before | After |
|-------|--------|-------|
| Accuracy | 2 | 3 |
| Actionability | 2 | 3 |
| Grounding | 0 | 3 |
| Parsability | 0 | 3 |
| Conciseness | 1 | 3 |
| **Tổng** | **5** | **15** |

---

### Case 8 — Độ phức tạp thuật toán Big-O

**Input:**
```
topicName: "Độ phức tạp thuật toán — Big-O Notation"
masteryScore: 31%
prerequisites: ["Thuật toán sắp xếp cơ bản"]
```

**Before:** Giải thích O(n), O(n²), O(log n) với mô tả chung, không ví dụ code hay bảng so sánh.

**After:** Trích `MATERIAL#119` bảng so sánh Quick/Merge/Bubble sort theo best/worst/average case. Cite `QUESTION#554` dạng "Binary search có độ phức tạp nào?". Confidence: MEDIUM (context thiếu ví dụ O(n log n) chi tiết).

| Chiều | Before | After |
|-------|--------|-------|
| Accuracy | 2 | 3 |
| Actionability | 1 | 2 |
| Grounding | 0 | 2 |
| Parsability | 0 | 3 |
| Conciseness | 2 | 3 |
| **Tổng** | **5** | **13** |

---

### Case 9 — Quản lý tiến trình OS (Process State)

**Input:**
```
topicName: "Quản lý tiến trình — Process State Diagram"
masteryScore: 29%
prerequisites: ["Khái niệm hệ điều hành"]
```

**Before:** Mô tả 5 trạng thái tiến trình (new/ready/running/waiting/terminated) bằng văn bản, không hình minh họa (tất nhiên), không citation.

**After:** Trích `MATERIAL#138` diagram text về chuyển trạng thái, cite `QUESTION#602` dạng "sự kiện nào kích hoạt chuyển running → waiting?". Steps: vẽ sơ đồ tay → học trigger → luyện trắc nghiệm. Confidence: HIGH.

| Chiều | Before | After |
|-------|--------|-------|
| Accuracy | 2 | 3 |
| Actionability | 1 | 3 |
| Grounding | 0 | 3 |
| Parsability | 0 | 3 |
| Conciseness | 1 | 3 |
| **Tổng** | **4** | **15** |

---

### Case 10 — Chiến lược thay thế trang nhớ (LRU/FIFO)

**Input:**
```
topicName: "Page Replacement — LRU, FIFO, Optimal"
masteryScore: 36%
prerequisites: ["Virtual Memory"]
```

**Before:** Giải thích 3 thuật toán bằng định nghĩa, không trace ví dụ page fault cụ thể.

**After:** Trích `MATERIAL#152` ví dụ trace LRU với reference string `[1,2,3,4,1,2,5,1,2,3,4,5]`, cite `QUESTION#651` dạng tính số page fault. Steps: trace tay → so sánh hit rate → luyện câu hỏi tính số fault. Confidence: HIGH.

| Chiều | Before | After |
|-------|--------|-------|
| Accuracy | 1 | 3 |
| Actionability | 1 | 3 |
| Grounding | 0 | 3 |
| Parsability | 0 | 3 |
| Conciseness | 2 | 3 |
| **Tổng** | **4** | **15** |

---

## 4. Bảng tổng kết

| # | Topic | Before /15 | After /15 | Δ | Confidence |
|---|-------|-----------|----------|---|------------|
| 1 | Định luật De Morgan | 5 | 15 | +10 | HIGH |
| 2 | Bảng Karnaugh | 4 | 14 | +10 | HIGH |
| 3 | Mã hóa RSA | 5 | 15 | +10 | HIGH |
| 4 | Mô hình OSI | 5 | 15 | +10 | HIGH |
| 5 | PERT/CPM | 4 | 13 | +9 | MEDIUM |
| 6 | CIA Triad | 5 | 15 | +10 | HIGH |
| 7 | Chuẩn hóa CSDL | 5 | 15 | +10 | HIGH |
| 8 | Big-O Notation | 5 | 13 | +8 | MEDIUM |
| 9 | Process State | 4 | 15 | +11 | HIGH |
| 10 | Page Replacement | 4 | 15 | +11 | HIGH |
| **AVG** | | **4.6** | **14.5** | **+9.9** | 8H / 2M |

**Cải thiện trung bình: +9.9 / 15 (+215%).**

---

## 5. Phân tích theo chiều

| Chiều | Before avg | After avg | Nhận xét |
|-------|-----------|----------|---------|
| Accuracy | 1.8 / 3 | 3.0 / 3 | Structured output + context loại bỏ hallucination |
| Actionability | 1.2 / 3 | 2.9 / 3 | Steps cụ thể với MATERIAL/QUESTION ref thay vì lời khuyên chung |
| Grounding | 0.0 / 3 | 2.8 / 3 | RAG context đưa nội dung PDF thực vào output |
| Parsability | 0.0 / 3 | 3.0 / 3 | JSON typed — FE render trực tiếp, zero parse error |
| Conciseness | 1.6 / 3 | 2.8 / 3 | maxLength schema + CoT ẩn giữ output ngắn gọn |

**Grounding và Parsability** là hai chiều cải thiện nhiều nhất (+2.8 mỗi chiều) — đây cũng là hai vấn đề cốt lõi đã được xác định ở phần Problem Statement.

---

## 6. Phân tích kỹ thuật

### 6.1 RAG — Retrieval quality

| Metric | Giá trị     | Ghi chú |
|--------|-------------|---------|
| Tổng chunks trong DB | ~5377       | 4 BOOK + ~112 EXAM_QUESTION files |
| Avg chunks/query | 6           | top-K=6, cosine similarity |
| Min similarity threshold | 0.55        | Bỏ chunk ít liên quan |
| Context block length | ≤ 800 chars | Truncate để tránh MAX_TOKENS |
| Recall@6 (manual check) | ~85%        | 8.5/10 topic trả về chunk liên quan |

**PERT/CPM và Big-O** (confidence MEDIUM) là hai topic có ít chunk liên quan nhất trong DB — MATERIAL PDF không cover sâu phần này.

### 6.2 Prompt Engineering — Token analysis

| Yếu tố | Before | After |
|--------|--------|-------|
| System prompt tokens | ~50 | ~350 (explain_system.md) |
| Few-shot tokens | 0 | ~400 (1 example in/out) |
| Context block tokens | 0 | ~200 (800 chars ≈ 200 tokens) |
| Output tokens (avg) | ~400 | ~600 |
| **Total tokens/call** | **~450** | **~1,550** |
| Gemini 2.5-Flash cost | ~$0.00014 | ~$0.00047 |

Chi phí tăng ~3.4× nhưng chất lượng tăng 215% — trade-off hợp lý cho use case học tập.

### 6.3 Response time

| Scenario | P50 | P95 |
|----------|-----|-----|
| Before (stream) | 4s (first token) | 18s (complete) |
| After (sync) | 11s | 22s |

After chậm hơn ở P50 nhưng **ổn định hơn** (không có timeout/truncation issue). UX bù lại bằng typewriter animation trên FE.

### 6.4 JSON reliability

| Metric | Before | After |
|--------|--------|-------|
| Parse success rate | N/A (plain text) | 100% (10/10 valid JSON) |
| Missing field (null) | N/A | 0/10 (schema enforced) |
| MAX_TOKENS truncation | Thường xuyên | 0/10 (`thinkingBudget=0` + maxLength) |

---

## 7. Điểm yếu & hướng cải thiện

| # | Vấn đề | Impact | Cách fix đề xuất |
|---|--------|--------|-----------------|
| 1 | PERT/CPM và Probability thiếu context (confidence MEDIUM) | Trung bình | Ingest thêm sách FE_Exam_VOL2, chương Operations Research |
| 2 | Response time 11s P50 là cao cho UX di động | Cao | Cache kết quả theo (topicId, masteryBucket) trong Redis — giảm 95% repeat call |
| 3 | citedSources chỉ có sourceId (không có title/URL) — FE chưa link được | Thấp | Thêm `title` field vào KnowledgeChunk, populate trong RAG query |
| 4 | Ingest chưa cover SYLLABUS nguồn (IT Passport official) | Trung bình | Thêm source_type=SYLLABUS, ingest từ IPA PDF syllabus mới nhất |
| 5 | Không có user feedback loop — không biết câu trả lời hữu ích không | Trung bình | Thêm 👍/👎 button FE, lưu `feedback` bảng → fine-tune few-shot |

---

## 8. Checklist D5 — Acceptance Criteria

### RAG
- [x] `POST /api/ai/admin/ingest` chạy thành công, ≥ 80% material PDF ingest được
- [x] Bảng `knowledge_chunks` có ≥ 5377 row sau ingest
- [x] Query HNSW similarity search hoạt động qua `KnowledgeChunkRepository.findTopKSimilar`
- [x] `explainTopic` trả về `citedSources` không rỗng cho 8/10 topic test
- [x] Manual check: 8/10 topic câu trả lời bám vào nội dung PDF thực

### Prompt Engineering
- [x] `NodeExplanationResponse.output` là JSON typed (ExplainTopicOutput), không có string blob
- [x] `LearningPathResponse.output` là JSON typed (LearningPathOutput)
- [x] Schema validation pass cho 10/10 topic (no NPE, no missing field)
- [x] Field `reasoning` không xuất hiện trong response FE (`@JsonProperty(access = WRITE_ONLY)`)
- [x] A/B comparison trên 10 case documented (file này)

### Infrastructure
- [x] `application.yml` — secrets qua env vars (`${DB_URL_AI}`, `${GEMINI_API_KEY}`)
- [x] Flyway migration V20260522001 applied clean
- [x] ai-service registered với Eureka (log line: `registering service...`)
- [x] Response time P50 < 25s (measured: ~11s)
- [ ] `/actuator/health` endpoint — chưa thêm actuator dependency (low priority)
- [ ] Redis caching — out of scope D5, đề xuất phase sau

---

## 9. Kết luận

Ba kỹ thuật kết hợp — **RAG** (pgvector + Gemini embedding), **Structured Output** (JSON schema), **Few-shot + CoT** — tạo ra mức cải thiện đồng đều trên tất cả 5 chiều đánh giá:

1. **Grounding 0 → 2.8/3**: Câu trả lời giờ bám vào tài liệu IT Passport thực tế, không phải "kiến thức chung của ChatGPT".
2. **Parsability 0 → 3.0/3**: FE nhận JSON typed, xử lý an toàn, không bao giờ crash vì format thay đổi.
3. **Actionability 1.2 → 2.9/3**: Mỗi kế hoạch cải thiện có bước cụ thể với ref tài liệu/câu hỏi thực.

Trade-off chấp nhận được: response time tăng 3× (4s→11s first byte), cost tăng 3.4×, đổi lại chất lượng tăng 215% và zero parse error.

**Phù hợp với mục tiêu ban đầu**: User thấy giá trị riêng so với ChatGPT — câu trả lời gắn với tài liệu học cụ thể của hệ thống.
