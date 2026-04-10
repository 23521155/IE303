package com.edu.question.entities;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class QuestionTagMapId implements Serializable {

    private Integer questionId;
    private Integer tagId;
}
