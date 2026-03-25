package com.edu.exam.dtos;

import lombok.Getter;

import java.util.Map;

@Getter
public class UpdateExamRequest {
    private Map<String, String> title;
    private String category;
    private String image;
    private Integer duration;
    private Integer questionCount;
    private Map<String, String> description;
}
