package com.edu.exam.dtos;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
public class AttemptListItemDto {
    private String id;
    private String examId;
    private Map<String, String> examTitle;
    private Double score;
    private Integer totalCorrect;
    private Integer questionCount;
    private Integer timeSpentSeconds;
    private LocalDateTime createdAt;
}
