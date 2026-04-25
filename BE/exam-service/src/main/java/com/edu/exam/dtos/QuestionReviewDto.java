package com.edu.exam.dtos;

import lombok.Data;

import java.util.List;

@Data
public class QuestionReviewDto {
    private String id;
    private String text;
    private List<String> options;
    private Integer correctAnswer;
    private Integer questionOrder;
}
