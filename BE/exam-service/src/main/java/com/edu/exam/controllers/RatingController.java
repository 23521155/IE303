package com.edu.exam.controllers;

import com.edu.exam.dtos.RatingResponse;
import com.edu.exam.dtos.SubmitRatingRequest;
import com.edu.exam.services.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exams/{examId}/rating")
@RequiredArgsConstructor
public class RatingController {
    private final RatingService ratingService;

    @GetMapping
    public ResponseEntity<RatingResponse> getRatingSummary(
            @PathVariable String examId,
            @AuthenticationPrincipal String userId
    ) {
        String safeUserId = (userId == null || userId.isBlank()) ? null : userId;
        return ResponseEntity.ok(ratingService.getRatingSummary(examId, safeUserId));
    }

    @PostMapping
    public ResponseEntity<RatingResponse> submitRating(
            @PathVariable String examId,
            @RequestBody SubmitRatingRequest request,
            @AuthenticationPrincipal String userId
    ) {
        if (userId == null || userId.isBlank()) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(ratingService.submitRating(examId, userId, request.getRating()));
    }
}
