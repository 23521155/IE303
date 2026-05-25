package com.edu.ai.services;

import com.edu.ai.clients.ExamServiceClient;
import com.edu.ai.dtos.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CoachService {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private final ExamServiceClient examServiceClient;
    private final LLMService llmService;
    private final RagService ragService;

    public CoachService(ExamServiceClient examServiceClient, LLMService llmService, RagService ragService) {
        this.examServiceClient = examServiceClient;
        this.llmService = llmService;
        this.ragService = ragService;
    }

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

        Integer daysRemaining = request.getDaysRemaining() != null ? request.getDaysRemaining() : 14;
        int maxTopicsAllowed = daysRemaining * 2;

        List<NodeDTO> allWeakNodes = analysis.getNodes().stream()
                .filter(n -> n.getMasteryScore() < 70.0 && n.getTotalAttempts() > 0)
                .sorted(Comparator.comparingDouble(NodeDTO::getMasteryScore))
                .collect(Collectors.toList());

        Set<NodeDTO> allPrereqs = new LinkedHashSet<>();
            for (NodeDTO weakNode : allWeakNodes) {
                analysis.getEdges().stream()
                    .filter(e -> e.getFrom().equals(weakNode.getId()) && "PREREQUISITE".equals(e.getRelation()))
                    .map(e -> nodeMap.get(e.getTo()))
                    .filter(n -> n != null && n.getMasteryScore() < 70.0)
                    .forEach(allPrereqs::add);
            }

        List<String> finalPrerequisites = new ArrayList<>();
        List<String> finalWeakTopics = new ArrayList<>();
        int currentCount = 0;

        for (NodeDTO prereq : allPrereqs) {
                if (currentCount >= maxTopicsAllowed) break;
                finalPrerequisites.add(prereq.getName());
                currentCount++;
            }

        for (NodeDTO weak : allWeakNodes) {
                if (currentCount >= maxTopicsAllowed) break;
                // Kiểm tra tránh trùng lặp nếu môn yếu vô tình đã nằm trong list tiên quyết
                if (!finalPrerequisites.contains(weak.getName())) {
                    finalWeakTopics.add(weak.getName());
                    currentCount++;
                }
            }

        List<String> allSelectedTopics = new ArrayList<>(finalPrerequisites);
        allSelectedTopics.addAll(finalWeakTopics);
        String ragQuery = allSelectedTopics.stream().limit(3).collect(Collectors.joining(", "));
        String contextBlock = ragService.retrieveContext(ragQuery);

        LearningPathOutput output = llmService.generateLearningPath(
                finalWeakTopics, finalPrerequisites, daysRemaining, contextBlock
            );

        return new LearningPathResponse(output, finalWeakTopics, finalPrerequisites, daysRemaining);
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

        String contextBlock = ragService.retrieveContext(topic.getName());

        ExplainTopicOutput output = llmService.explainTopic(
            topic.getName(), topic.getMasteryScore(), prerequisites, contextBlock
        );

        List<String> relatedTopics = analysis.getEdges().stream()
            .filter(e -> e.getFrom().equals(topicId) || e.getTo().equals(topicId))
            .map(e -> e.getFrom().equals(topicId) ? e.getTo() : e.getFrom())
            .distinct()
            .collect(Collectors.toList());

        return new NodeExplanationResponse(topicId, output, prerequisites, relatedTopics);
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

        String contextBlock = ragService.retrieveContext(topic.getName());

        llmService.streamExplainTopic(topic.getName(), topic.getMasteryScore(), prerequisites, contextBlock, emitter);
    }

    public void streamGenerateLearningPath(String userId, Integer daysRemaining, SseEmitter emitter) {
        log.info("Streaming learning path for userId: {}, days: {}", userId, daysRemaining);
        try {
            AICoachAnalysisDTO analysis = examServiceClient.getAnalysis(userId);

            Map<String, NodeDTO> nodeMap = analysis.getNodes().stream()
                .collect(Collectors.toMap(NodeDTO::getId, n -> n));

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

            List<String> prerequisites = new ArrayList<>(prerequisiteNames);

            String ragQuery = weakTopicNames.stream().limit(3).collect(Collectors.joining(", "));
            String contextBlock = ragService.retrieveContext(ragQuery);

            // Send meta after RAG so LLM starts streaming immediately after FE receives META
            String meta = "__META__" + OBJECT_MAPPER.writeValueAsString(Map.of(
                "weakTopics", weakTopicNames,
                "prerequisites", prerequisites,
                "daysRemaining", daysRemaining
            ));
            emitter.send(SseEmitter.event().data(meta));

            llmService.streamGenerateLearningPath(weakTopicNames, prerequisites, daysRemaining, contextBlock, emitter);

        } catch (Exception e) {
            log.error("Stream learning path error for userId {}", userId, e);
            emitter.completeWithError(e);
        }
    }
}
