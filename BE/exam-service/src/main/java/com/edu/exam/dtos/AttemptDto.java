package com.edu.exam.dtos;

import com.edu.exam.entities.Exam;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class AttemptDto {
    private String id;
    private String userId;
    private ExamReviewDto exam;
    private Double score;
    private Integer totalCorrect;
    private Integer timeSpent;
    private LocalDateTime createdAt;
    private List<AttemptAnswerDto> answers;
}
