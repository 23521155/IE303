package com.edu.exam.mappers;

import com.edu.exam.dtos.CategoryDto;
import com.edu.exam.entities.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryDto toCategoryDto(Category category);
}
