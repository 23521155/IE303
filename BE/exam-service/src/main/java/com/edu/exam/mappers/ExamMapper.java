package com.edu.exam.mappers;

import com.edu.exam.dtos.CreateExamRequest;
import com.edu.exam.dtos.ExamDto;
import com.edu.exam.dtos.UpdateExamRequest;
import com.edu.exam.entities.Exam;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ExamMapper {
    @Mapping(source = "category.name", target = "category")
    ExamDto toExamDto(Exam exam);

    @Mapping(target = "category.id", source = "category")
    Exam toEntity(CreateExamRequest request);

    @Mapping(target = "category", ignore = true)
    void update(UpdateExamRequest request, @MappingTarget Exam exam);
}
