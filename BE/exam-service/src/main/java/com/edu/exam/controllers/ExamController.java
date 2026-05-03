package com.edu.exam.controllers;

import com.edu.exam.dtos.*;
import com.edu.exam.services.ExamService;
import com.edu.exam.services.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
public class ExamController {
    private final ExamService examService;
    private final QuestionService questionService;

    @GetMapping
    public ResponseEntity<List<ExamDto>> getAllExams(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category
    ) {
        return ResponseEntity.ok(examService.getAllExams(search, category));
    }

    @GetMapping("/popular")
    public ResponseEntity<List<ExamSummaryDto>> getPopularExams() {
        return ResponseEntity.ok(examService.getPopularExams());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExamDto> getExamById(@PathVariable String id) {
        return ResponseEntity.ok(examService.getExamById(id));
    }

    @GetMapping("/{id}/questions")
    public ResponseEntity<List<QuestionDto>> getExamQuestions(@PathVariable String id) {
        return ResponseEntity.ok(questionService.getQuestionsByExamId(id));
    }

    @PostMapping
    public ResponseEntity<ExamDto> createExam(@RequestBody CreateExamRequest request, UriComponentsBuilder uriBuilder) {
        var uri = uriBuilder.path("/api/exams/{id}").buildAndExpand(request.getId()).toUri();
        return ResponseEntity.created(uri).body(examService.createExam(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExamDto> updateExam(@PathVariable String id, @RequestBody UpdateExamRequest request) {
        return ResponseEntity.ok(examService.updateExam(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable String id) {
        examService.deleteExam(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<Map<String, String>> submitExam(
            @PathVariable String id, @RequestBody SubmitExamRequest request, Principal principal) {
        String userId = principal.getName();
        String attemptId = examService.submitExam(id, request, userId);
        return ResponseEntity.ok(Map.of("attemptId", attemptId));
    }
}
