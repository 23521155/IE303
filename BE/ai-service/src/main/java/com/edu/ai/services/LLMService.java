package com.edu.ai.services;

import com.edu.ai.dtos.ExplainTopicOutput;
import com.edu.ai.dtos.LearningPathOutput;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface LLMService {

    LearningPathOutput generateLearningPath(List<String> weakTopics, List<String> prerequisites,
                                            Integer daysRemaining, String contextBlock);

    ExplainTopicOutput explainTopic(String topicName, Double masteryScore,
                                    List<String> prerequisites, String contextBlock);

    default void streamExplainTopic(String topicName, Double masteryScore,
                                    List<String> prerequisites, String contextBlock,
                                    SseEmitter emitter) {
        throw new UnsupportedOperationException("Streaming not supported by this LLM provider");
    }

    default void streamGenerateLearningPath(List<String> weakTopics, List<String> prerequisites,
                                            Integer daysRemaining, String contextBlock,
                                            SseEmitter emitter) {
        throw new UnsupportedOperationException("Streaming not supported by this LLM provider");
    }
}
