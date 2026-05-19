package com.edu.ai.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LearningPathResponse {
    private String learningPath;
    private List<String> weakTopics;
    private List<String> prerequisitesToReview;
    private Integer daysRemaining;
}
