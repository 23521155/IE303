package com.edu.exam.mappers;

import com.edu.exam.dtos.QuestionDto;
import com.edu.exam.entities.Question;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    QuestionDto toQuestionDto(Question question);
}
