package com.edu.exam.services;

import com.edu.exam.dtos.RatingResponse;
import com.edu.exam.entities.ExamRating;
import com.edu.exam.exceptions.ResourceNotFoundException;
import com.edu.exam.repositories.ExamRatingRepository;
import com.edu.exam.repositories.ExamRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RatingService {
    private final ExamRatingRepository examRatingRepository;
    private final ExamRepository examRepository;

    @Transactional
    @CacheEvict(value = "exams", key = "#examId")
    public RatingResponse submitRating(String examId, String userId, int rating) {
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        examRepository.findById(examId)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", examId));

        ExamRating examRating = examRatingRepository.findByExam_IdAndUserId(examId, userId)
                .orElseGet(() -> {
                    ExamRating r = new ExamRating();
                    r.setId(UUID.randomUUID().toString());
                    r.setUserId(userId);
                    r.setExam(examRepository.getReferenceById(examId));
                    return r;
                });

        examRating.setRating(rating);
        examRating.setUpdatedAt(LocalDateTime.now());
        examRatingRepository.save(examRating);

        return recomputeAggregate(examId, userId);
    }

    @Transactional
    public RatingResponse getRatingSummary(String examId, String userId) {
        examRepository.findById(examId)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", examId));

        Double avg = examRatingRepository.getAverageRating(examId);
        int count = examRatingRepository.getRatingCount(examId);

        BigDecimal avgBd = avg == null ? BigDecimal.ZERO : BigDecimal.valueOf(avg).setScale(2, RoundingMode.HALF_UP);

        Integer userRating = null;
        if (userId != null && !userId.isBlank()) {
            userRating = examRatingRepository.findByExam_IdAndUserId(examId, userId)
                    .map(ExamRating::getRating)
                    .orElse(null);
        }

        return new RatingResponse(avgBd, count, userRating);
    }

    private RatingResponse recomputeAggregate(String examId, String userId) {
        Double avg = examRatingRepository.getAverageRating(examId);
        int count = examRatingRepository.getRatingCount(examId);

        BigDecimal avgBd = avg == null ? BigDecimal.ZERO : BigDecimal.valueOf(avg).setScale(2, RoundingMode.HALF_UP);

        examRepository.updateRatingAggregate(examId, avgBd, count);

        Integer userRating = examRatingRepository.findByExam_IdAndUserId(examId, userId)
                .map(ExamRating::getRating)
                .orElse(null);

        return new RatingResponse(avgBd, count, userRating);
    }
}
