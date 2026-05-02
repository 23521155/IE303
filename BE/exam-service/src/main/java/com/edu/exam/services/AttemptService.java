package com.edu.exam.services;

import com.edu.exam.dtos.AttemptDto;
import com.edu.exam.dtos.AttemptListItemDto;
import com.edu.exam.dtos.AttemptProfileSummaryDto;
import com.edu.exam.entities.Attempt;
import com.edu.exam.exceptions.ResourceNotFoundException;
import com.edu.exam.mappers.AttemptMapper;
import com.edu.exam.repositories.ExamAttemptRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttemptService {
    private static final int RECENT_ATTEMPTS_LIMIT = 20;

    private final ExamAttemptRepository examAttemptRepository;
    private final AttemptMapper attemptMapper;

    @Cacheable(value = "attempts", key = "#id")
    public AttemptDto getAttemptById(String id) {
        return attemptMapper.toDto(examAttemptRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Attempt not found")));
    }

    public AttemptProfileSummaryDto getProfileSummary(String userId) {
        ExamAttemptRepository.AttemptStats stats = examAttemptRepository.getStatsByUserId(userId);

        long completed = stats.getCompletedCount();
        long totalPracticeSeconds = stats.getTotalTimeSpent();

        List<Attempt> recent = examAttemptRepository.findByUserIdOrderByCreatedAtDesc(
                userId, PageRequest.of(0, RECENT_ATTEMPTS_LIMIT));

        List<AttemptListItemDto> items = recent.stream().map(this::toListItem).toList();

        return AttemptProfileSummaryDto.builder()
                .completedCount(completed)
                .totalPracticeSeconds(totalPracticeSeconds)
                .recentAttempts(items)
                .build();
    }

    private AttemptListItemDto toListItem(Attempt a) {
        var exam = a.getExam();
        return AttemptListItemDto.builder()
                .id(a.getId())
                .examId(exam.getId())
                .examTitle(exam.getTitle())
                .score(a.getScore())
                .totalCorrect(a.getTotalCorrect())
                .questionCount(exam.getQuestionCount())
                .timeSpentSeconds(a.getTimeSpent())
                .createdAt(a.getCreatedAt())
                .build();
    }
}
