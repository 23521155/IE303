package com.edu.exam.mappers;

import com.edu.exam.dtos.AttemptAnswerDto;
import com.edu.exam.entities.AttemptAnswer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AttemptAnswerMapper {
    AttemptAnswerDto toDto(AttemptAnswer attemptAnswer);
}
