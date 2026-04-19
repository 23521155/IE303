package com.edu.exam.controllers;

import com.edu.exam.dtos.AttemptDto;
import com.edu.exam.services.AttemptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/attempts")
@RequiredArgsConstructor
public class AttemptController {
    private final AttemptService attemptService;

    @GetMapping("/{id}")
    public ResponseEntity<AttemptDto> getAttemptById(@PathVariable String id) {
        return ResponseEntity.ok(attemptService.getAttemptById(id));
    }
}
