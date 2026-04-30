package com.edu.exam.dtos;

import lombok.Data;

import java.util.Map;

@Data
public class SubmitExamRequest {
    private Map<String, Integer> answers;
    private Integer timeSpent;
}
