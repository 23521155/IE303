package com.edu.ai.services;

import com.edu.ai.dtos.ExplainTopicOutput;
import com.edu.ai.dtos.LearningPathOutput;
import com.edu.ai.services.prompt.PromptBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.Objects;
import java.util.stream.Collectors;


@Service
@ConditionalOnProperty(name = "llm.provider", havingValue = "gemini", matchIfMissing = true)
@Slf4j
public class GeminiService implements LLMService {

    private static final String BASE_URL = "https://generativelanguage.googleapis.com";
    private static final String MODEL = "gemini-2.5-flash";
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private final RestClient restClient;
    private final RestClient streamingRestClient;
    private final String apiKey;
    private final PromptBuilder promptBuilder;

    public GeminiService(@Value("${gemini.api-key}") String apiKey, PromptBuilder promptBuilder) {
        this.apiKey = apiKey;
        this.promptBuilder = promptBuilder;

        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(5));
        factory.setReadTimeout(Duration.ofSeconds(80));
        this.restClient = RestClient.builder()
            .baseUrl(BASE_URL)
            .defaultHeader("content-type", "application/json")
            .requestFactory(factory)
            .build();

        SimpleClientHttpRequestFactory streamFactory = new SimpleClientHttpRequestFactory();
        streamFactory.setConnectTimeout(Duration.ofSeconds(5));
        streamFactory.setReadTimeout(Duration.ofSeconds(120));
        this.streamingRestClient = RestClient.builder()
            .baseUrl(BASE_URL)
            .defaultHeader("content-type", "application/json")
            .requestFactory(streamFactory)
            .build();
    }

    @Override
    public ExplainTopicOutput explainTopic(String topicName, Double masteryScore,
                                           List<String> prerequisites, String contextBlock) {
        log.info("Explaining topic '{}' via Gemini structured, mastery={}%", topicName, masteryScore);
        String userPrompt = promptBuilder.buildExplainUserPrompt(topicName, masteryScore, prerequisites, contextBlock);
        return callStructured(
            promptBuilder.getExplainSystemPrompt(),
            promptBuilder.getExplainFewShotContents(),
            userPrompt,
            promptBuilder.getExplainSchemaGemini(),
            8192,
            ExplainTopicOutput.class
        );
    }

    @Override
    public LearningPathOutput generateLearningPath(List<String> weakTopics, List<String> prerequisites,
                                                   Integer daysRemaining, String contextBlock) {
        log.info("Generating learning path via Gemini structured for {} days", daysRemaining);
        String userPrompt = promptBuilder.buildLearningPathUserPrompt(weakTopics, prerequisites, daysRemaining, contextBlock);
        return callStructured(
            promptBuilder.getLearningPathSystemPrompt(),
            List.of(),
            userPrompt,
            promptBuilder.getLearningPathSchemaGemini(),
            5000,
            LearningPathOutput.class
        );
    }

    @Override
    public void streamExplainTopic(String topicName, Double masteryScore,
                                   List<String> prerequisites, String contextBlock,
                                   SseEmitter emitter) {
        log.info("Streaming explain for '{}' via Gemini, mastery={}%", topicName, masteryScore);
        try {
            // Step 1: stream text immediately for typewriter effect (fast, first token ~2-3s)
            String textPrompt = buildStreamExplainPrompt(topicName, masteryScore, prerequisites, contextBlock);
            streamPrompt(textPrompt, 1200, emitter, false);

            // Step 2: get structured JSON (runs after text stream completes)
            ExplainTopicOutput output = explainTopic(topicName, masteryScore, prerequisites, contextBlock);
            emitter.send(SseEmitter.event().data("__STRUCTURED__:" + OBJECT_MAPPER.writeValueAsString(output)));
            emitter.complete();
        } catch (Exception e) {
            log.error("Stream explain error for '{}'", topicName, e);
            emitter.completeWithError(e);
        }
    }

    private String buildReadableExplainText(ExplainTopicOutput output) {
        StringBuilder sb = new StringBuilder();
        var why = output.getWhyDifficult();
        if (why != null) {
            if (why.getSummary() != null) sb.append(why.getSummary());
            if (why.getPoints() != null) {
                why.getPoints().forEach(p -> sb.append("\n• ").append(p));
            }
            sb.append("\n\n");
        }
        var plan = output.getImprovementPlan();
        if (plan != null) {
            if (plan.getSummary() != null) sb.append(plan.getSummary());
            if (plan.getSteps() != null) {
                plan.getSteps().forEach(s ->
                    sb.append("\n").append(s.getOrder()).append(". ").append(s.getAction())
                      .append(" (").append(s.getEstimatedMinutes()).append("m)")
                );
            }
            sb.append("\n\n");
        }
        var prereqs = output.getPrerequisiteOrder();
        if (prereqs != null && !prereqs.isEmpty()) {
            prereqs.forEach(p ->
                sb.append("→ ").append(p.getTopicName()).append(": ").append(p.getReason()).append("\n")
            );
        }
        return sb.toString().trim();
    }

    @Override
    public void streamGenerateLearningPath(List<String> weakTopics, List<String> prerequisites,
                                           Integer daysRemaining, String contextBlock,
                                           SseEmitter emitter) {
        log.info("Streaming learning path via Gemini for {} days", daysRemaining);
        String prompt = buildStreamLearningPathPrompt(weakTopics, prerequisites, daysRemaining, contextBlock);
        streamPrompt(prompt, 2500, emitter);
    }

   private <T> T callStructured(
           String systemPrompt,
           List<Map<String, Object>> fewShotContents,
           String userPrompt,
           Map<String, Object> schema,
           int maxTokens,
           Class<T> responseType
   ) {

       int retry = 0;

       while (retry < 2) {

           try {

               List<Map<String, Object>> contents =
                   new ArrayList<>(fewShotContents);

               contents.add(
                   Map.of(
                       "role", "user",
                       "parts", List.of(
                           Map.of("text", userPrompt)
                       )
                   )
               );

               Map<String, Object> body = Map.of(
                   "systemInstruction", Map.of(
                       "parts", List.of(
                           Map.of(
                               "text",
                               systemPrompt
                                   + "\n\nIMPORTANT:"
                                   + "\n- Return concise JSON."
                                   + "\n- Keep explanations short."
                                   + "\n- Do not exceed response size."
                           )
                       )
                   ),
                   "contents", contents,
                   "generationConfig", Map.of(
                       "responseMimeType", "application/json",
                       "responseSchema", schema,
                       "maxOutputTokens", maxTokens,
                       "temperature", 0.2,
                       "thinkingConfig", Map.of("thinkingBudget", 0)
                   )
               );

               Map<?, ?> response = restClient.post()
                   .uri("/v1beta/models/" + MODEL + ":generateContent?key=" + apiKey)
                   .body(body)
                   .retrieve()
                   .body(Map.class);

               if (response == null) {
                   throw new RuntimeException("Null response");
               }

               if (response.containsKey("error")) {
                   throw new RuntimeException(
                       "Gemini API error: " + response.get("error")
                   );
               }

               List<Map<?, ?>> candidates =
                   (List<Map<?, ?>>) response.get("candidates");

               if (candidates == null || candidates.isEmpty()) {
                   throw new RuntimeException("No candidates");
               }

               Map<?, ?> candidate = candidates.get(0);

               String finishReason =
                   (String) candidate.get("finishReason");

               Map<?, ?> content =
                   (Map<?, ?>) candidate.get("content");

               if (content == null) {
                   throw new RuntimeException("No content");
               }

               List<Map<?, ?>> parts =
                   (List<Map<?, ?>>) content.get("parts");

               if (parts == null || parts.isEmpty()) {
                   throw new RuntimeException("No parts");
               }

               String jsonText = parts.stream()
                   .filter(p -> !Boolean.TRUE.equals(p.get("thought")))
                   .map(p -> (String) p.get("text"))
                   .filter(Objects::nonNull)
                   .collect(Collectors.joining())
                   .trim();

               log.info("Finish reason: {}", finishReason);
               log.info("Raw response: {}", jsonText);

               // remove markdown
               jsonText = jsonText
                   .replace("```json", "")
                   .replace("```", "")
                   .trim();

               // =========================
               // AUTO RETRY WHEN TRUNCATED
               // =========================
               if ("MAX_TOKENS".equals(finishReason)) {

                   retry++;

                   log.warn(
                       "Gemini truncated response. Retry {}...",
                       retry
                   );

                   // retry with bigger token
                   maxTokens += 2048;

                   // shorten prompt
                   userPrompt =
                       userPrompt +
                       "\n\nIMPORTANT: Be shorter and concise.";

                   continue;
               }

               return OBJECT_MAPPER.readValue(
                   jsonText,
                   responseType
               );

           } catch (JsonProcessingException e) {

               retry++;

               log.warn(
                   "JSON parse failed. Retry {}...",
                   retry,
                   e
               );

               // retry concise
               userPrompt =
                   userPrompt +
                   "\n\nIMPORTANT: Return valid compact JSON only.";

           } catch (Exception e) {

               log.error("Gemini call failed", e);

               throw new RuntimeException(
                   "Failed structured response",
                   e
               );
           }
       }

       throw new RuntimeException(
           "Gemini failed after retries"
       );
   }

    private void streamPrompt(String prompt, int maxOutputTokens, SseEmitter emitter) {
        streamPrompt(prompt, maxOutputTokens, emitter, true);
    }

    private void streamPrompt(String prompt, int maxOutputTokens, SseEmitter emitter, boolean completeOnDone) {
        Map<String, Object> body = Map.of(
            "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt)))),
            "generationConfig", Map.of(
                "maxOutputTokens", maxOutputTokens,
                "thinkingConfig", Map.of("thinkingBudget", 0)
            )
        );
        streamingRestClient.post()
            .uri("/v1beta/models/" + MODEL + ":streamGenerateContent?key=" + apiKey + "&alt=sse")
            .body(body)
            .exchange((req, response) -> {
                try (BufferedReader reader = new BufferedReader(
                        new InputStreamReader(response.getBody(), StandardCharsets.UTF_8))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        if (line.startsWith("data: ")) {
                            String chunk = extractTextFromJson(line.substring(6).trim());
                            if (chunk != null && !chunk.isEmpty()) {
                                emitter.send(SseEmitter.event().data(chunk));
                            }
                        }
                    }
                    if (completeOnDone) {
                        emitter.complete();
                    }
                } catch (Exception e) {
                    log.error("Gemini streaming error", e);
                    emitter.completeWithError(e);
                }
                return null;
            });
    }

@SuppressWarnings("unchecked")
    private String extractTextFromJson(String json) {
        try {
            Map<?, ?> map = OBJECT_MAPPER.readValue(json, Map.class);
            List<Map<?, ?>> candidates = (List<Map<?, ?>>) map.get("candidates");
            if (candidates == null || candidates.isEmpty()) return null;
            Map<?, ?> content = (Map<?, ?>) candidates.get(0).get("content");
            if (content == null) return null;
            List<Map<?, ?>> parts = (List<Map<?, ?>>) content.get("parts");
            if (parts == null || parts.isEmpty()) return null;
            // Skip thinking parts — get first non-empty text part
            return parts.stream()
                .filter(p -> !Boolean.TRUE.equals(p.get("thought")))
                .map(p -> (String) p.get("text"))
                .filter(t -> t != null && !t.isEmpty())
                .findFirst()
                .orElse(null);
        } catch (Exception e) {
            return null;
        }
    }

    private String buildStreamExplainPrompt(String topicName, Double masteryScore,
                                            List<String> prerequisites, String contextBlock) {
        String contextSection = (contextBlock != null && !contextBlock.isBlank())
                ? "\n\nTài liệu tham khảo (dùng để minh hoạ):\n" + contextBlock
                : "";
        return """
                Chủ đề: %s | Thành thạo: %.0f%% | Tiên quyết cần ôn: %s
                %s
                Trả lời bằng tiếng Việt, súc tích, theo format:
                **Lý do khó:** (3 câu)
                **Cách cải thiện:** (4 câu hướng dẫn cụ thể)
                **Thứ tự ôn tiên quyết:** (3 câu)
                """.formatted(topicName, masteryScore,
                prerequisites.isEmpty() ? "không có" : String.join(", ", prerequisites),
                contextSection);
    }

    private String buildStreamLearningPathPrompt(List<String> weakTopics, List<String> prerequisites,
                                                 Integer days, String contextBlock) {
        String contextSection = (contextBlock != null && !contextBlock.isBlank())
                ? "\n\nTài liệu tham khảo:\n" + contextBlock
                : "";
        return """
                Bạn là giáo viên ôn thi IT Passport. Hãy tạo lộ trình ôn tập %d ngày.

                Chủ đề yếu (dưới 70%%):
                - %s

                Chủ đề tiên quyết cần ôn lại:
                - %s
                %s
                Yêu cầu:
                1. Kế hoạch cụ thể từng ngày (mục tiêu + thời gian + phương pháp)
                2. Ưu tiên chủ đề tiên quyết trước
                3. Ngày cuối: ôn tổng hợp
                Trả lời bằng tiếng Việt, thực tế, ngắn gọn.
                """.formatted(days,
                String.join("\n- ", weakTopics),
                prerequisites.isEmpty() ? "Không có" : String.join("\n- ", prerequisites),
                contextSection);
    }
}
