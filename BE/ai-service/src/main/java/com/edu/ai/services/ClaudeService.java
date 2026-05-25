package com.edu.ai.services;

import com.edu.ai.dtos.ExplainTopicOutput;
import com.edu.ai.dtos.LearningPathOutput;
import com.edu.ai.services.prompt.PromptBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    private static final String MODEL = "claude-sonnet-4-6";
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private final RestClient restClient;
    private final PromptBuilder promptBuilder;

    public ClaudeService(@Value("${anthropic.api-key}") String apiKey, PromptBuilder promptBuilder) {
        this.promptBuilder = promptBuilder;
        this.restClient = RestClient.builder()
            .baseUrl("https://api.anthropic.com")
            .defaultHeader("x-api-key", apiKey)
            .defaultHeader("anthropic-version", "2023-06-01")
            .defaultHeader("content-type", "application/json")
            .build();
    }

    @Override
    public ExplainTopicOutput explainTopic(String topicName, Double masteryScore,
                                           List<String> prerequisites, String contextBlock) {
        log.info("Explaining topic '{}' via Claude structured, mastery={}%", topicName, masteryScore);
        String userPrompt = promptBuilder.buildExplainUserPrompt(topicName, masteryScore, prerequisites, contextBlock);
        return callStructured(
            promptBuilder.getExplainSystemPrompt(),
            userPrompt,
            "emit_explanation",
            promptBuilder.getExplainSchemaClaud(),
            2000,
            ExplainTopicOutput.class
        );
    }

    @Override
    public LearningPathOutput generateLearningPath(List<String> weakTopics, List<String> prerequisites,
                                                   Integer daysRemaining, String contextBlock) {
        log.info("Generating learning path via Claude structured for {} days", daysRemaining);
        String userPrompt = promptBuilder.buildLearningPathUserPrompt(weakTopics, prerequisites, daysRemaining, contextBlock);
        return callStructured(
            promptBuilder.getLearningPathSystemPrompt(),
            userPrompt,
            "emit_learning_path",
            promptBuilder.getLearningPathSchemaClaud(),
            3000,
            LearningPathOutput.class
        );
    }

    @SuppressWarnings("unchecked")
    private <T> T callStructured(String systemPrompt, String userPrompt,
                                 String toolName, Map<String, Object> inputSchema,
                                 int maxTokens, Class<T> responseType) {
        Map<String, Object> body = Map.of(
            "model", MODEL,
            "max_tokens", maxTokens,
            "system", systemPrompt,
            "tools", List.of(Map.of(
                "name", toolName,
                "description", "Emit structured response",
                "input_schema", inputSchema
            )),
            "tool_choice", Map.of("type", "tool", "name", toolName),
            "messages", List.of(Map.of("role", "user", "content", userPrompt))
        );
        try {
            Map<?, ?> response = restClient.post()
                .uri("/v1/messages")
                .body(body)
                .retrieve()
                .body(Map.class);

            List<Map<?, ?>> content = (List<Map<?, ?>>) response.get("content");
            Map<?, ?> toolUse = content.stream()
                .filter(c -> "tool_use".equals(c.get("type")))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No tool_use in Claude response"));

            String inputJson = OBJECT_MAPPER.writeValueAsString(toolUse.get("input"));
            return OBJECT_MAPPER.readValue(inputJson, responseType);
        } catch (Exception e) {
            log.error("Claude structured call failed for {}", responseType.getSimpleName(), e);
            throw new RuntimeException("Failed to get structured response from Claude", e);
        }
    }
}
