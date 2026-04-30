package com.edu.exam.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Set;

@AllArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ExamDto {
    private String id;
    private Map<String, String> title;
    private CategoryDto category;
    private String image;
    private Integer duration;
    private Integer questionCount;
    private Map<String, String> description;
    private Integer participants;
    private BigDecimal rating;
    private Set<QuestionDto> questions;
}