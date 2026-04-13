package com.edu.result.controller;

import com.edu.result.entity.ExamAttempt;
import com.edu.result.service.ResultService;
import com.edu.result.service.ResultService.AnswerSubmission;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ResultController {
    private final ResultService resultService;

    @PostMapping("/{attemptId}/submit")
    public ResponseEntity<ExamAttempt> submitExam(
            @PathVariable Integer attemptId,
            @RequestBody List<AnswerSubmission> submissions) {

        // Pass the data to the Service
        ExamAttempt gradedAttempt = resultService.submitAndGradeExam(attemptId, submissions);

        // Return the graded exam back to Next.js with a 200 OK status
        return ResponseEntity.ok(gradedAttempt);
    }
}