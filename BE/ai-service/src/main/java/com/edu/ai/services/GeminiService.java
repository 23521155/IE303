package com.edu.ai.services;

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
import java.util.List;
import java.util.Map;

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

    public GeminiService(@Value("${gemini.api-key}") String apiKey) {
        this.apiKey = apiKey;

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
    public String generateLearningPath(List<String> weakTopics, List<String> prerequisites, Integer daysRemaining) {
        log.info("Generating learning path via Gemini for {} days", daysRemaining);
        String prompt = buildLearningPathPrompt(weakTopics, prerequisites, daysRemaining);
        return call(prompt, 2000);
    }

    @Override
    public String explainTopic(String topicName, Double masteryScore, List<String> prerequisites) {
        log.info("Explaining topic '{}' via Gemini, mastery={}%", topicName, masteryScore);
        String prompt = buildExplainPrompt(topicName, masteryScore, prerequisites);
        return call(prompt, 1500);
    }

    @SuppressWarnings("unchecked")
    private String call(String prompt, int maxOutputTokens) {
        Map<String, Object> body = Map.of(
            "contents", List.of(Map.of(
                "parts", List.of(Map.of("text", prompt))
            )),
            "generationConfig", Map.of(
                "maxOutputTokens", maxOutputTokens,
                "thinkingConfig", Map.of("thinkingBudget", 0)
            )
        );
        try {
            Map<?, ?> response = restClient.post()
                .uri("/v1beta/models/" + MODEL + ":generateContent?key=" + apiKey)
                .body(body)
                .retrieve()
                .body(Map.class);

            List<Map<?, ?>> candidates = (List<Map<?, ?>>) response.get("candidates");
            Map<?, ?> content = (Map<?, ?>) candidates.get(0).get("content");
            List<Map<?, ?>> parts = (List<Map<?, ?>>) content.get("parts");
            return (String) parts.get(0).get("text");
        } catch (Exception e) {
            log.error("Gemini API error", e);
            throw new RuntimeException("Failed to call Gemini API", e);
        }
    }

    @Override
    public void streamExplainTopic(String topicName, Double masteryScore, List<String> prerequisites, SseEmitter emitter) {
        log.info("Streaming explain for '{}' via Gemini, mastery={}%", topicName, masteryScore);
        String prompt = buildExplainPrompt(topicName, masteryScore, prerequisites);
        Map<String, Object> body = Map.of(
            "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt)))),
            "generationConfig", Map.of(
                "maxOutputTokens", 1500,
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
                    emitter.complete();
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
            return (String) parts.get(0).get("text");
        } catch (Exception e) {
            return null;
        }
    }

    private String buildLearningPathPrompt(List<String> weakTopics, List<String> prerequisites, Integer days) {
        return """
            Bạn là giáo viên ôn thi IT Passport. Hãy tạo lộ trình ôn tập %d ngày.

            Chủ đề yếu (dưới 70%%):
            - %s

            Chủ đề tiên quyết cần ôn lại:
            - %s

            Yêu cầu:
            1. Kế hoạch cụ thể từng ngày (mục tiêu + thời gian + phương pháp)
            2. Ưu tiên chủ đề tiên quyết trước
            3. Ngày cuối: ôn tổng hợp
            Trả lời bằng tiếng Việt, thực tế, ngắn gọn.
            """.formatted(days,
                String.join("\n- ", weakTopics),
                prerequisites.isEmpty() ? "Không có" : String.join("\n- ", prerequisites));
    }

    private String buildExplainPrompt(String topicName, Double masteryScore, List<String> prerequisites) {
        return """
            Chủ đề: %s | Thành thạo: %.0f%% | Tiên quyết cần ôn: %s
            Trả lời theo đúng format sau (tổng khoảng 10 câu), dùng tiếng Việt, súc tích:
            **Lý do khó:** (3 câu giải thích tại sao chủ đề này khó)
            **Cách cải thiện:** (4 câu hướng dẫn cụ thể để nâng điểm)
            **Thứ tự ôn tiên quyết:** (3 câu gợi ý nên học tiên quyết nào trước và tại sao)
            """.formatted(topicName, masteryScore,
                prerequisites.isEmpty() ? "không có" : String.join(", ", prerequisites));
    }
}
