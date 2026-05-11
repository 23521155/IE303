package com.edu.exam.controllers;

import com.edu.exam.dtos.AttemptDto;
import com.edu.exam.dtos.AttemptProfileSummaryDto;
import com.edu.exam.services.AttemptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/attempts")
@RequiredArgsConstructor
public class AttemptController {
    private final AttemptService attemptService;

    @GetMapping("/me/summary")
    public ResponseEntity<AttemptProfileSummaryDto> getMyProfileSummary(
            @RequestHeader(value = "X-User-Id", required = false) String userId) {
        if (userId == null || userId.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(attemptService.getProfileSummary(userId));
    }

    @GetMapping("/users/{userId}/summary")
    public ResponseEntity<AttemptProfileSummaryDto> getUserProfileSummary(@PathVariable String userId) {
        return ResponseEntity.ok(attemptService.getProfileSummary(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttemptDto> getAttemptById(@PathVariable String id) {
        return ResponseEntity.ok(attemptService.getAttemptById(id));
    }
}
