package com.edu.ai.services.prompt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
public class PromptBuilder {

    private final String explainSystemPrompt;
    private final String learningPathSystemPrompt;

    public PromptBuilder() {
        this.explainSystemPrompt = loadResource("prompts/explain_system.md");
        this.learningPathSystemPrompt = loadResource("prompts/learning_path_system.md");
    }

    private String loadResource(String path) {
        try {
            ClassPathResource resource = new ClassPathResource(path);
            try (Reader reader = new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)) {
                return FileCopyUtils.copyToString(reader);
            }
        } catch (IOException e) {
            log.warn("Cannot load prompt file: {}. Using empty fallback.", path);
            return "";
        }
    }

    public String getExplainSystemPrompt() {
        return explainSystemPrompt;
    }

    public String getLearningPathSystemPrompt() {
        return learningPathSystemPrompt;
    }

    public String buildExplainUserPrompt(String topicName, Double masteryScore,
                                         List<String> prerequisites, String contextBlock) {
        String ctx = (contextBlock != null && !contextBlock.isBlank())
                ? contextBlock.substring(0, Math.min(contextBlock.length(), 800))
                : null;
        String contextSection = (ctx != null)
                ? "\n\n<CONTEXT>\n" + ctx + "\n</CONTEXT>"
                : "\n\n<CONTEXT>\nKhông có tài liệu tham khảo.\n</CONTEXT>";
        return """
                Chủ đề: %s
                Mức độ thành thạo hiện tại: %.0f%%
                Tiên quyết chưa vững: %s
                %s""".formatted(
                topicName,
                masteryScore,
                prerequisites.isEmpty() ? "Không có" : String.join(", ", prerequisites),
                contextSection
        );
    }

    public String buildLearningPathUserPrompt(List<String> weakTopics, List<String> prerequisites,
                                              Integer days, String contextBlock) {
        String ctx = (contextBlock != null && !contextBlock.isBlank())
                ? contextBlock.substring(0, Math.min(contextBlock.length(), 800))
                : null;
        String contextSection = (ctx != null)
                ? "\n\n<CONTEXT>\n" + ctx + "\n</CONTEXT>"
                : "\n\n<CONTEXT>\nKhông có tài liệu tham khảo.\n</CONTEXT>";

        String topicList = weakTopics.stream().map(t -> "- " + t).reduce("", (a, b) -> a + "\n" + b).strip();
        String prereqList = prerequisites.isEmpty()
                    ? "- Không có"
                    : prerequisites.stream().map(t -> "- " + t).reduce("", (a, b) -> a + "\n" + b).strip();


        // THÊM LOGIC LUẬT ĐỘNG Ở ĐÂY
        int totalTopics = weakTopics.size() + prerequisites.size();
        String dynamicRule;
        if (totalTopics >= days) {
                dynamicRule = "LUẬT 1: Thời gian gấp. Hãy gộp 1 đến 2 chủ đề vào 1 ngày. Không để ngày nào trống.";
            } else {
                dynamicRule = "LUẬT 1: Thời gian rộng rãi. Mỗi ngày chỉ học 1 chủ đề. Rải đều các chủ đề vào các ngày đầu.";
            }

        String durationRule = (days > 14)
                ? "LUẬT 2: Vì thời gian dài (" + days + " ngày), CHỈ TẠO dailyPlan chi tiết cho 14 NGÀY ĐẦU TIÊN. Các ngày còn lại từ 15 đến " + days + " chỉ tóm tắt vào mảng weeklyMilestones."
                : "LUẬT 2: Lên dailyPlan chi tiết cho toàn bộ " + days + " ngày.";


        return """
                    Số ngày còn lại: %d
                    Tổng số chủ đề cần học: %d

                    Chủ đề yếu (mastery < 70%%):
                    %s

                    Tiên quyết cần ôn trước:
                    %s
                    %s

                    QUY TẮC BẮT BUỘC (CỰC KỲ QUAN TRỌNG):
                    - %s
                    - %s
                    - Ưu tiên xếp các môn Tiên quyết vào học trước.
                    """.formatted(days, totalTopics, topicList, prereqList, contextSection, dynamicRule, durationRule);
    }

    /** Few-shot for explain topic — 1 example as Gemini multi-turn contents */
    public List<Map<String, Object>> getExplainFewShotContents() {
        String inputText = """
                Chủ đề: Định luật De Morgan
                Mức độ thành thạo hiện tại: 35%
                Tiên quyết chưa vững: Đại số Boolean, Bảng chân trị

                <CONTEXT>
                [MATERIAL#12] Định luật De Morgan: NOT(A AND B) = (NOT A) OR (NOT B). Dùng để đơn giản hoá biểu thức logic và mạch điện số.
                [QUESTION#45] Câu hỏi: "Biểu thức NOT(P AND Q) tương đương với?" Đáp án: (NOT P) OR (NOT Q)
                </CONTEXT>""";

        String outputJson = """
                {"reasoning":"Mastery 35% thấp. Context có định nghĩa rõ ràng và câu hỏi mẫu. Prerequisite Boolean chưa vững → học viên chưa quen ký hiệu phủ định. Ưu tiên Boolean → Bảng chân trị → De Morgan.","whyDifficult":{"summary":"Định luật De Morgan đòi hỏi tư duy trừu tượng về phủ định và chuyển đổi phép toán logic, dễ nhầm chiều chuyển đổi AND/OR.","points":["Chưa vững nền tảng Đại số Boolean đặc biệt ký hiệu AND/OR/NOT.","Dễ nhầm: NOT(A AND B) ≠ (NOT A) AND (NOT B) — phép AND phải đổi thành OR sau khi phủ định.","Thiếu thực hành với bảng chân trị để tự kiểm chứng kết quả."]},"improvementPlan":{"summary":"Củng cố từ nền tảng Boolean lên De Morgan qua 3 bước tuần tự.","steps":[{"order":1,"action":"Ôn lại bảng chân trị AND/OR/NOT, làm 10 bài tập cơ bản để nắm vững ký hiệu.","estimatedMinutes":30},{"order":2,"action":"Đọc MATERIAL#12 về định luật De Morgan, tự điền bảng chân trị để chứng minh cả hai dạng.","estimatedMinutes":45},{"order":3,"action":"Giải 5 câu dạng QUESTION#45 để nhận dạng pattern câu hỏi thi.","estimatedMinutes":30}]},"prerequisiteOrder":[{"topicName":"Đại số Boolean","reason":"Nền tảng bắt buộc; không hiểu Boolean thì De Morgan vô nghĩa."},{"topicName":"Bảng chân trị","reason":"Công cụ kiểm chứng định luật; cần thành thạo trước khi áp dụng De Morgan."}],"citedSources":[{"sourceType":"MATERIAL","sourceId":"12","snippet":"NOT(A AND B) = (NOT A) OR (NOT B). Dùng để đơn giản hoá biểu thức logic."},{"sourceType":"QUESTION","sourceId":"45","snippet":"Biểu thức NOT(P AND Q) tương đương với?"}],"confidence":"HIGH"}""";

        List<Map<String, Object>> contents = new ArrayList<>();
        contents.add(Map.of("role", "user", "parts", List.of(Map.of("text", inputText))));
        contents.add(Map.of("role", "model", "parts", List.of(Map.of("text", outputJson))));
        return contents;
    }

    /** Gemini responseSchema for ExplainTopicOutput (uppercase types) */
    public Map<String, Object> getExplainSchemaGemini() {
        var stepSchema = Map.of(
                "type", "OBJECT",
                "properties", Map.of(
                        "order", Map.of("type", "INTEGER"),
                        "action", Map.of("type", "STRING", "maxLength", 120),
                        "estimatedMinutes", Map.of("type", "INTEGER")
                )
        );
        var prereqItemSchema = Map.of(
                "type", "OBJECT",
                "properties", Map.of(
                        "topicName", Map.of("type", "STRING", "maxLength", 80),
                        "reason", Map.of("type", "STRING", "maxLength", 100)
                )
        );
        var citedSourceSchema = Map.of(
                "type", "OBJECT",
                "properties", Map.of(
                        "sourceType", Map.of("type", "STRING"),
                        "sourceId", Map.of("type", "STRING"),
                        "snippet", Map.of("type", "STRING", "maxLength", 100)
                )
        );
        return Map.of(
                "type", "OBJECT",
                "properties", Map.of(
                        "reasoning", Map.of("type", "STRING", "maxLength", 200),
                        "whyDifficult", Map.of(
                                "type", "OBJECT",
                                "properties", Map.of(
                                        "summary", Map.of("type", "STRING", "maxLength", 350),
                                        "points", Map.of("type", "ARRAY", "items", Map.of("type", "STRING", "maxLength", 120), "maxItems", 3)
                                )
                        ),
                        "improvementPlan", Map.of(
                                "type", "OBJECT",
                                "properties", Map.of(
                                        "summary", Map.of("type", "STRING", "maxLength", 150),
                                        "steps", Map.of("type", "ARRAY", "items", stepSchema, "maxItems", 3)
                                )
                        ),
                        "prerequisiteOrder", Map.of("type", "ARRAY", "items", prereqItemSchema, "maxItems", 2),
                        "citedSources", Map.of("type", "ARRAY", "items", citedSourceSchema, "maxItems", 3),
                        "confidence", Map.of("type", "STRING", "enum", List.of("HIGH", "MEDIUM", "LOW"))
                )
        );
    }

    /** Gemini responseSchema for LearningPathOutput (uppercase types) */
    public Map<String, Object> getLearningPathSchemaGemini() {
        var taskSchema = Map.of(
                "type", "OBJECT",
                "properties", Map.of(
                        "type", Map.of("type", "STRING"),
                        "ref", Map.of("type", "STRING"),
                        "minutes", Map.of("type", "INTEGER")
                )
        );
        var dayPlanSchema = Map.of(
                "type", "OBJECT",
                "properties", Map.of(
                        "day", Map.of("type", "INTEGER"),
                        "focusTopic", Map.of("type", "STRING", "maxLength", 60),
                        "goal", Map.of("type", "STRING", "maxLength", 80),
                        "tasks", Map.of("type", "ARRAY", "items", taskSchema, "maxItems", 5),
                        "totalMinutes", Map.of("type", "INTEGER")
                )
        );
        var weeklySchema = Map.of(
                "type", "OBJECT",
                "properties", Map.of(
                        "week", Map.of("type", "INTEGER"),
                        "milestone", Map.of("type", "STRING", "maxLength", 100)
                )
        );
        var citedSourceSchema = Map.of(
                "type", "OBJECT",
                "properties", Map.of(
                        "sourceType", Map.of("type", "STRING"),
                        "sourceId", Map.of("type", "STRING"),
                        "snippet", Map.of("type", "STRING", "maxLength", 80)
                )
        );
        return Map.of(
                "type", "OBJECT",
                "properties", Map.of(
                        "reasoning", Map.of("type", "STRING", "maxLength", 200),
                        "totalDays", Map.of("type", "INTEGER"),
                        "dailyPlan", Map.of("type", "ARRAY", "items", dayPlanSchema),
                        "weeklyMilestones", Map.of("type", "ARRAY", "items", weeklySchema, "maxItems", 15),
                        "citedSources", Map.of("type", "ARRAY", "items", citedSourceSchema, "maxItems", 3),
                        "confidence", Map.of("type", "STRING", "enum", List.of("HIGH", "MEDIUM", "LOW"))
                )
        );
    }

    /** Claude tool input_schema for ExplainTopicOutput (lowercase types) */
    public Map<String, Object> getExplainSchemaClaud() {
        return Map.of(
                "type", "object",
                "required", List.of("reasoning", "whyDifficult", "improvementPlan", "prerequisiteOrder", "citedSources", "confidence"),
                "properties", Map.of(
                        "reasoning", Map.of("type", "string", "description", "Chain-of-thought reasoning process"),
                        "whyDifficult", Map.of(
                                "type", "object",
                                "properties", Map.of(
                                        "summary", Map.of("type", "string"),
                                        "points", Map.of("type", "array", "items", Map.of("type", "string"))
                                )
                        ),
                        "improvementPlan", Map.of(
                                "type", "object",
                                "properties", Map.of(
                                        "summary", Map.of("type", "string"),
                                        "steps", Map.of("type", "array", "items", Map.of(
                                                "type", "object",
                                                "properties", Map.of(
                                                        "order", Map.of("type", "integer"),
                                                        "action", Map.of("type", "string"),
                                                        "estimatedMinutes", Map.of("type", "integer")
                                                )
                                        ))
                                )
                        ),
                        "prerequisiteOrder", Map.of("type", "array", "items", Map.of(
                                "type", "object",
                                "properties", Map.of(
                                        "topicName", Map.of("type", "string"),
                                        "reason", Map.of("type", "string")
                                )
                        )),
                        "citedSources", Map.of("type", "array", "items", Map.of(
                                "type", "object",
                                "properties", Map.of(
                                        "sourceType", Map.of("type", "string"),
                                        "sourceId", Map.of("type", "string"),
                                        "snippet", Map.of("type", "string")
                                )
                        )),
                        "confidence", Map.of("type", "string", "enum", List.of("HIGH", "MEDIUM", "LOW"))
                )
        );
    }

    /** Claude tool input_schema for LearningPathOutput (lowercase types) */
    public Map<String, Object> getLearningPathSchemaClaud() {
        return Map.of(
                "type", "object",
                "required", List.of("reasoning", "totalDays", "dailyPlan", "weeklyMilestones", "citedSources", "confidence"),
                "properties", Map.of(
                        "reasoning", Map.of("type", "string"),
                        "totalDays", Map.of("type", "integer"),
                        "dailyPlan", Map.of("type", "array", "items", Map.of(
                                "type", "object",
                                "properties", Map.of(
                                        "day", Map.of("type", "integer"),
                                        "focusTopic", Map.of("type", "string"),
                                        "goal", Map.of("type", "string"),
                                        "tasks", Map.of("type", "array", "items", Map.of(
                                                "type", "object",
                                                "properties", Map.of(
                                                        "type", Map.of("type", "string"),
                                                        "ref", Map.of("type", "string"),
                                                        "minutes", Map.of("type", "integer")
                                                )
                                        )),
                                        "totalMinutes", Map.of("type", "integer")
                                )
                        )),
                        "weeklyMilestones", Map.of("type", "array", "items", Map.of(
                                "type", "object",
                                "properties", Map.of(
                                        "week", Map.of("type", "integer"),
                                        "milestone", Map.of("type", "string")
                                )
                        )),
                        "citedSources", Map.of("type", "array", "items", Map.of(
                                "type", "object",
                                "properties", Map.of(
                                        "sourceType", Map.of("type", "string"),
                                        "sourceId", Map.of("type", "string"),
                                        "snippet", Map.of("type", "string")
                                )
                        )),
                        "confidence", Map.of("type", "string", "enum", List.of("HIGH", "MEDIUM", "LOW"))
                )
        );
    }
}
