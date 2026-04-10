package com.edu.exam.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.Map;

@AllArgsConstructor
@Getter
public class ExamDto {
    private String id;
    private Map<String, String> title;
    private String category;
    private String image;
    private Integer duration;
    private Integer questionCount;
    private Map<String, String> description;
    private Integer participants;
    private BigDecimal rating;
}