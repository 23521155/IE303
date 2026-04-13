package com.edu.exam.services;

import com.edu.exam.dtos.QuestionDto;
import com.edu.exam.mappers.QuestionMapper;
import com.edu.exam.repositories.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;

    public List<QuestionDto> getQuestionsByExamId(String examId) {
        return questionRepository.findByExamIdOrderByQuestionOrder(examId)
                .stream()
                .map(questionMapper::toQuestionDto)
                .toList();

    }
}
