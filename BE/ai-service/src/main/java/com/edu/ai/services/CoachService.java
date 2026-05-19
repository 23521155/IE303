package com.edu.ai.services;

import com.edu.ai.clients.ExamServiceClient;
import com.edu.ai.dtos.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CoachService {
    private final ExamServiceClient examServiceClient;
    private final LLMService llmService;

    public AICoachAnalysisDTO analyzeUserKnowledge(String userId) {
        log.info("Fetching analysis for userId: {}", userId);
        AICoachAnalysisDTO analysis = examServiceClient.getAnalysis(userId);
        log.info("Analysis fetched: {} nodes, {} edges", analysis.getNodes().size(), analysis.getEdges().size());
        return analysis;
    }

    public LearningPathResponse generateLearningPath(String userId, LearningPathRequest request) {
        log.info("Generating learning path for userId: {}", userId);
        AICoachAnalysisDTO analysis = examServiceClient.getAnalysis(userId);

        Map<String, NodeDTO> nodeMap = analysis.getNodes().stream()
            .collect(Collectors.toMap(NodeDTO::getId, n -> n));

        // Top 15: ưu tiên topics đã làm bài (attempts > 0) rồi sort theo mastery thấp nhất
        List<NodeDTO> weakNodes = analysis.getNodes().stream()
            .filter(n -> n.getMasteryScore() < 70.0 && n.getTotalAttempts() > 0)
            .sorted(Comparator.comparingDouble(NodeDTO::getMasteryScore))
            .limit(15)
            .collect(Collectors.toList());

        List<String> weakTopicNames = weakNodes.stream()
            .map(NodeDTO::getName)
            .collect(Collectors.toList());

        Set<String> prerequisiteNames = new HashSet<>();
        for (NodeDTO weakNode : weakNodes) {
            analysis.getEdges().stream()
                .filter(e -> e.getFrom().equals(weakNode.getId()) && "PREREQUISITE".equals(e.getRelation()))
                .map(e -> nodeMap.get(e.getTo()))
                .filter(n -> n != null && n.getMasteryScore() < 70.0)
                .map(NodeDTO::getName)
                .limit(10)
                .forEach(prerequisiteNames::add);
        }

        Integer daysRemaining = request.getDaysRemaining() != null ? request.getDaysRemaining() : 14;

        String learningPath = llmService.generateLearningPath(
            weakTopicNames,
            new ArrayList<>(prerequisiteNames),
            daysRemaining
        );

        return new LearningPathResponse(
            learningPath,
            weakTopicNames,
            new ArrayList<>(prerequisiteNames),
            daysRemaining
        );
    }

    public NodeExplanationResponse explainTopic(String userId, String topicId) {
        log.info("Explaining topic {} for userId: {}", topicId, userId);
        AICoachAnalysisDTO analysis = examServiceClient.getAnalysis(userId);

        Map<String, NodeDTO> nodeMap = analysis.getNodes().stream()
            .collect(Collectors.toMap(NodeDTO::getId, n -> n));

        NodeDTO topic = nodeMap.get(topicId);
        if (topic == null) {
            throw new RuntimeException("Topic not found: " + topicId);
        }

        List<String> prerequisites = analysis.getEdges().stream()
            .filter(e -> e.getFrom().equals(topicId) && "PREREQUISITE".equals(e.getRelation()))
            .map(e -> nodeMap.get(e.getTo()))
            .filter(Objects::nonNull)
            .map(NodeDTO::getName)
            .collect(Collectors.toList());

        String explanation = llmService.explainTopic(
            topic.getName(),
            topic.getMasteryScore(),
            prerequisites
        );

        List<String> relatedTopics = analysis.getEdges().stream()
            .filter(e -> e.getFrom().equals(topicId) || e.getTo().equals(topicId))
            .map(e -> e.getFrom().equals(topicId) ? e.getTo() : e.getFrom())
            .distinct()
            .collect(Collectors.toList());

        return new NodeExplanationResponse(topicId, explanation, prerequisites, relatedTopics);
    }

    public void streamExplainTopic(String userId, String topicId, SseEmitter emitter) {
        log.info("Streaming explain for topic {} userId: {}", topicId, userId);
        AICoachAnalysisDTO analysis = examServiceClient.getAnalysis(userId);

        Map<String, NodeDTO> nodeMap = analysis.getNodes().stream()
            .collect(Collectors.toMap(NodeDTO::getId, n -> n));

        NodeDTO topic = nodeMap.get(topicId);
        if (topic == null) {
            emitter.completeWithError(new RuntimeException("Topic not found: " + topicId));
            return;
        }

        List<String> prerequisites = analysis.getEdges().stream()
            .filter(e -> e.getFrom().equals(topicId) && "PREREQUISITE".equals(e.getRelation()))
            .map(e -> nodeMap.get(e.getTo()))
            .filter(Objects::nonNull)
            .map(NodeDTO::getName)
            .collect(Collectors.toList());

        llmService.streamExplainTopic(topic.getName(), topic.getMasteryScore(), prerequisites, emitter);
    }
}
