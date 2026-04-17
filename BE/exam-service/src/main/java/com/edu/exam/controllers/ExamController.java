package com.edu.exam.controllers;

import com.edu.exam.dtos.CreateExamRequest;
import com.edu.exam.dtos.ExamDto;
import com.edu.exam.dtos.QuestionDto;
import com.edu.exam.dtos.UpdateExamRequest;
import com.edu.exam.services.ExamService;
import com.edu.exam.services.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
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
}
