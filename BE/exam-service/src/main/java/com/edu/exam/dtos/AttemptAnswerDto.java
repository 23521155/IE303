package com.edu.exam.dtos;

import lombok.Data;

@Data
public class AttemptAnswerDto {
    private String id;
    private String questionId;
    private Integer selectedOption;
    private Boolean isCorrect;
}
