package com.edu.ai.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
@ConditionalOnProperty(name = "llm.provider", havingValue = "claude")
@Slf4j
public class ClaudeService implements LLMService {

    private final RestClient restClient;

    public ClaudeService(@Value("${anthropic.api-key}") String apiKey) {
        this.restClient = RestClient.builder()
            .baseUrl("https://api.anthropic.com")
            .defaultHeader("x-api-key", apiKey)
            .defaultHeader("anthropic-version", "2023-06-01")
            .defaultHeader("content-type", "application/json")
            .build();
    }

    @Override
    public String generateLearningPath(List<String> weakTopics, List<String> prerequisites, Integer daysRemaining) {
        log.info("Generating learning path via Claude for {} days", daysRemaining);
        String prompt = buildLearningPathPrompt(weakTopics, prerequisites, daysRemaining);
        return call(prompt);
    }

    @Override
    public String explainTopic(String topicName, Double masteryScore, List<String> prerequisites) {
        log.info("Explaining topic '{}' via Claude, mastery={}%", topicName, masteryScore);
        String prompt = buildExplainPrompt(topicName, masteryScore, prerequisites);
        return call(prompt);
    }

    @SuppressWarnings("unchecked")
    private String call(String prompt) {
        Map<String, Object> body = Map.of(
            "model", "claude-3-5-sonnet-20241022",
            "max_tokens", 1500,
            "messages", List.of(Map.of("role", "user", "content", prompt))
        );
        try {
            Map<?, ?> response = restClient.post()
                .uri("/v1/messages")
                .body(body)
                .retrieve()
                .body(Map.class);

            List<Map<?, ?>> content = (List<Map<?, ?>>) response.get("content");
            return (String) content.get(0).get("text");
        } catch (Exception e) {
            log.error("Claude API error", e);
            throw new RuntimeException("Failed to call Claude API", e);
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
            Học viên đang gặp khó khăn với chủ đề: %s (thành thạo: %.0f%%)

            Chủ đề tiên quyết cần ôn lại:
            - %s

            Hãy:
            1. Giải thích tại sao học viên khó khăn với chủ đề này
            2. Cách tiếp cận hiệu quả để cải thiện
            3. Gợi ý ôn chủ đề tiên quyết nào trước
            4. Một ví dụ thực tế đơn giản
            Trả lời bằng tiếng Việt, thân thiện, khuyến khích.
            """.formatted(topicName, masteryScore,
                prerequisites.isEmpty() ? "Không có" : String.join("\n- ", prerequisites));
    }
}
