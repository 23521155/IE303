package com.edu.exam.services;

import com.edu.exam.dtos.AICoachAnalysisDTO;
import com.edu.exam.dtos.EdgeDTO;
import com.edu.exam.dtos.NodeDTO;
import com.edu.exam.entities.Topic;
import com.edu.exam.entities.UserTopicMastery;
import com.edu.exam.repositories.AttemptAnswerRepository;
import com.edu.exam.repositories.TopicEdgeRepository;
import com.edu.exam.repositories.TopicRepository;
import com.edu.exam.repositories.UserTopicMasteryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AICoachService {
    private final AttemptAnswerRepository attemptAnswerRepository;
    private final TopicRepository topicRepository;
    private final UserTopicMasteryRepository masteryRepository;
    private final TopicEdgeRepository edgeRepository;

    @Transactional
    public AICoachAnalysisDTO analyzeUserKnowledge(String userId) {
        log.info("Analyzing knowledge for userId: {}", userId);

        // Step 1: Tính mastery score per topic
        calculateAndSaveMastery(userId);

        // Step 2: Build nodes
        List<NodeDTO> nodes = buildNodes(userId);

        // Step 3: Build edges
        List<EdgeDTO> edges = buildEdges();

        log.info("Analysis complete: {} nodes, {} edges", nodes.size(), edges.size());
        return new AICoachAnalysisDTO(nodes, edges);
    }

    private void calculateAndSaveMastery(String userId) {
        List<Object[]> topicStats = attemptAnswerRepository.findTopicStatsByUserId(userId);

        if (topicStats.isEmpty()) {
            log.warn("No answers found for userId: {}", userId);
            return;
        }

        Map<String, Topic> topicMap = topicRepository.findAll().stream()
                .collect(Collectors.toMap(Topic::getId, t -> t));

        Map<String, UserTopicMastery> existingMap = masteryRepository.findByUserId(userId)
                .stream()
                .collect(Collectors.toMap(m -> m.getTopic().getId(), m -> m));

        List<UserTopicMastery> toSave = new ArrayList<>();
        for (Object[] stat : topicStats) {
            String topicId = (String) stat[0];
            int totalAttempts = ((Number) stat[1]).intValue();
            int correctAnswers = ((Number) stat[2]).intValue();

            Topic topic = topicMap.get(topicId);
            if (topic == null) continue;

            double masteryScore = (double) correctAnswers / totalAttempts * 100;
            double errorRate = 100 - masteryScore;

            UserTopicMastery mastery = existingMap.getOrDefault(topicId, new UserTopicMastery());
            mastery.setUserId(userId);
            mastery.setTopic(topic);
            mastery.setMasteryScore(masteryScore);
            mastery.setErrorRate(errorRate);
            mastery.setTotalAttempts(totalAttempts);
            mastery.setCorrectAnswers(correctAnswers);
            mastery.setLastUpdated(LocalDateTime.now());
            toSave.add(mastery);
        }
        masteryRepository.saveAll(toSave);
        log.debug("Saved {} mastery records for user {}", toSave.size(), userId);
    }

    private List<NodeDTO> buildNodes(String userId) {
        List<Topic> allTopics = topicRepository.findAll();
        Map<String, UserTopicMastery> masteryMap = masteryRepository.findByUserId(userId)
                .stream()
                .collect(Collectors.toMap(m -> m.getTopic().getId(), m -> m));

        return allTopics.stream()
                .map(topic -> {
                    UserTopicMastery mastery = masteryMap.get(topic.getId());
                    NodeDTO node = new NodeDTO();
                    node.setId(topic.getId());
                    node.setName(topic.getName());
                    node.setCategoryName(topic.getCategoryName());

                    if (mastery != null) {
                        node.setMasteryScore(mastery.getMasteryScore());
                        node.setErrorRate(mastery.getErrorRate());
                        node.setTotalAttempts(mastery.getTotalAttempts());
                    } else {
                        node.setMasteryScore(0.0);
                        node.setErrorRate(0.0);
                        node.setTotalAttempts(0);
                    }

                    return node;
                })
                .collect(Collectors.toList());
    }

    private List<EdgeDTO> buildEdges() {
        return edgeRepository.findAll().stream()
                .map(edge -> new EdgeDTO(
                        edge.getFromTopic().getId(),
                        edge.getToTopic().getId(),
                        edge.getRelationType()
                ))
                .collect(Collectors.toList());
    }
}
