package com.edu.ai.services;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.util.List;

public interface LLMService {
    String generateLearningPath(List<String> weakTopics, List<String> prerequisites, Integer daysRemaining);

    String explainTopic(String topicName, Double masteryScore, List<String> prerequisites);

    default void streamExplainTopic(String topicName, Double masteryScore, List<String> prerequisites, SseEmitter emitter) {
        throw new UnsupportedOperationException("Streaming not supported by this LLM provider");
    }
}
