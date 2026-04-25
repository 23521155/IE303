package com.edu.exam.services;

import com.edu.exam.dtos.CategoryDto;
import com.edu.exam.exceptions.ResourceNotFoundException;
import com.edu.exam.mappers.CategoryMapper;
import com.edu.exam.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Cacheable("categories")
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toCategoryDto)
                .toList();
    }

    public CategoryDto getCategoryById(String id) {
        return categoryMapper.toCategoryDto(categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category", id)));
    }
}
