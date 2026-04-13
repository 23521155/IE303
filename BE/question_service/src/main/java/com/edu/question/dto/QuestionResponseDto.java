package com.edu.question.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionResponseDto {

    private Integer questionId;
    private Integer examId;
    private String questionText;
    private String explanation;
    private String difficulty;
    private String topic;
}
