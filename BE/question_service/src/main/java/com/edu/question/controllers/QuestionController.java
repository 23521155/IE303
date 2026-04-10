package com.edu.question.controllers;

import com.edu.question.dto.QuestionRequestDto;
import com.edu.question.dto.QuestionResponseDto;
import com.edu.question.service.QuestionService;
import java.util.List;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public ResponseEntity<List<QuestionResponseDto>> getQuestions(
            @RequestParam(required = false) Integer examId,
            @RequestParam(required = false) String topic,
            @RequestParam(required = false) String difficulty) {
        if (examId != null) {
            return ResponseEntity.ok(questionService.getQuestionsByExamId(examId));
        }
        if (topic != null) {
            return ResponseEntity.ok(questionService.getQuestionsByTopic(topic));
        }
        if (difficulty != null) {
            return ResponseEntity.ok(questionService.getQuestionsByDifficulty(difficulty));
        }
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<QuestionResponseDto> getQuestionById(@PathVariable Integer questionId)
            throws NotFoundException {
        return ResponseEntity.ok(questionService.getQuestionById(questionId));
    }

    @PostMapping
    public ResponseEntity<QuestionResponseDto> createQuestion(@RequestBody QuestionRequestDto questionRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(questionService.createQuestion(questionRequestDto));
    }

    @PutMapping("/{questionId}")
    public ResponseEntity<QuestionResponseDto> updateQuestion(
            @PathVariable Integer questionId,
            @RequestBody QuestionRequestDto questionRequestDto) throws NotFoundException {
        return ResponseEntity.ok(questionService.updateQuestion(questionId, questionRequestDto));
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Integer questionId) throws NotFoundException {
        questionService.deleteQuestion(questionId);
        return ResponseEntity.noContent().build();
    }
}
