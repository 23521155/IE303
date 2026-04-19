package com.edu.exam.mappers;

import com.edu.exam.dtos.AttemptDto;
import com.edu.exam.entities.Attempt;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AttemptMapper {
    @Mapping(source = "exam.category.id", target = "exam.category")
    AttemptDto toDto(Attempt attempt);
}
