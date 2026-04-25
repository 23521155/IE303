package com.edu.exam.mappers;

import com.edu.exam.dtos.AttemptDto;
import com.edu.exam.entities.Attempt;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AttemptMapper {
    AttemptDto toDto(Attempt attempt);
}
