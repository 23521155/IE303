package com.edu.ai.controllers;

import com.edu.ai.dtos.*;
import com.edu.ai.services.CoachService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.concurrent.CompletableFuture;


@RestController
@RequestMapping("/api/coach")
@RequiredArgsConstructor
@Slf4j
public class CoachController {
    private final CoachService coachService;

    @GetMapping("/{userId}/analysis")
    public ResponseEntity<AICoachAnalysisDTO> analyzeUserKnowledge(@PathVariable String userId) {
        log.info("Analyzing knowledge for userId: {}", userId);
        AICoachAnalysisDTO analysis = coachService.analyzeUserKnowledge(userId);
        return ResponseEntity.ok(analysis);
    }

    @GetMapping("/{userId}/learning-path")
    public ResponseEntity<LearningPathResponse> generateLearningPath(
            @PathVariable String userId,
            @RequestParam(required = false, defaultValue = "14") Integer daysRemaining) {
        log.info("Generating learning path for userId: {}", userId);
        LearningPathResponse response = coachService.generateLearningPath(userId, new LearningPathRequest(daysRemaining));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/node/{topicId}/explain")
    public ResponseEntity<NodeExplanationResponse> explainTopic(
            @PathVariable String topicId,
            @RequestParam String userId) {
        log.info("Explaining topic {} for userId: {}", topicId, userId);
        NodeExplanationResponse response = coachService.explainTopic(userId, topicId);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/{userId}/learning-path/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamGenerateLearningPath(
            @PathVariable String userId,
            @RequestParam(required = false, defaultValue = "14") Integer daysRemaining) {
        log.info("SSE stream learning path for userId: {}, days: {}", userId, daysRemaining);
        SseEmitter emitter = new SseEmitter(120_000L);

        CompletableFuture.runAsync(() ->
            coachService.streamGenerateLearningPath(userId, daysRemaining, emitter)
        );

        return emitter;
    }

    @GetMapping(value = "/node/{topicId}/explain/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamExplainTopic(
            @PathVariable String topicId,
            @RequestParam String userId) {
        log.info("SSE stream explain topic {} for userId: {}", topicId, userId);
        SseEmitter emitter = new SseEmitter(90_000L);

        CompletableFuture.runAsync(() -> {
            try {
                coachService.streamExplainTopic(userId, topicId, emitter);
            } catch (Exception e) {
                log.error("Stream error for topic {}", topicId, e);
                emitter.completeWithError(e);
            }
        });

        return emitter;
    }
}
