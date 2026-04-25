package com.edu.exam.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class QuestionDto {
    private String id;
    private String text;
    private List<String> options;
//    private Integer correctAnswer;
    private Integer questionOrder;
}
