package com.edu.exam.services;

import com.edu.exam.dtos.AttemptDto;
import com.edu.exam.entities.Attempt;
import com.edu.exam.exceptions.ResourceNotFoundException;
import com.edu.exam.mappers.AttemptMapper;
import com.edu.exam.repositories.ExamAttemptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AttemptService {
    private final ExamAttemptRepository examAttemptRepository;
    private final AttemptMapper attemptMapper;

    public AttemptDto getAttemptById(String id) {
        return attemptMapper.toDto(examAttemptRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Attempt not found")));
    }
}
