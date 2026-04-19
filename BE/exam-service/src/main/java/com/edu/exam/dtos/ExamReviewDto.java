package com.edu.exam.dtos;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Set;

@Data
public class ExamReviewDto {
    private String id;
    private Map<String, String> title;
    private CategoryDto category;
    private String image;
    private Integer duration;
    private Integer questionCount;
    private Map<String, String> description;
    private Integer participants;
    private BigDecimal rating;
    private Set<QuestionReviewDto> questions;
}
