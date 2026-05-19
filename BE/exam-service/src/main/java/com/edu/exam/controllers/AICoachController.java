package com.edu.exam.controllers;

import com.edu.exam.dtos.AICoachAnalysisDTO;
import com.edu.exam.services.AICoachService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai-coach")
@RequiredArgsConstructor
public class AICoachController {
    private final AICoachService aiCoachService;

    @GetMapping("/{userId}/analysis")
    public ResponseEntity<AICoachAnalysisDTO> analyzeUserKnowledge(@PathVariable String userId) {
        AICoachAnalysisDTO analysis = aiCoachService.analyzeUserKnowledge(userId);
        return ResponseEntity.ok(analysis);
    }
}
