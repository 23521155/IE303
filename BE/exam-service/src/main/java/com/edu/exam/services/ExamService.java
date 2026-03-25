package com.edu.exam.services;

import com.edu.exam.dtos.CreateExamRequest;
import com.edu.exam.dtos.ExamDto;
import com.edu.exam.dtos.UpdateExamRequest;
import com.edu.exam.entities.Exam;
import com.edu.exam.exceptions.ResourceNotFoundException;
import com.edu.exam.mappers.ExamMapper;
import com.edu.exam.repositories.CategoryRepository;
import com.edu.exam.repositories.ExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamService {
    private final ExamRepository examRepository;
    private final ExamMapper examMapper;
    private final CategoryRepository categoryRepository;

    public List<ExamDto> getAllExams(String search, String category) {
        List<Exam> exams;

        boolean hasSearch = search != null && !search.isBlank();
        boolean hasCategory = category != null && !category.isBlank();

        if (hasCategory && hasSearch) {
            exams = examRepository.findByCategoryAndSearch(category, search);
        } else if (hasSearch) {
            exams = examRepository.findBySearch(search);
        } else if (hasCategory) {
            exams = examRepository.findByCategory_Id(category);
        } else {
            exams = examRepository.findAll();
        }
        return exams.stream().map(examMapper::toExamDto).toList();
    }

    public ExamDto getExamById(String id) {
        return examMapper.toExamDto(examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", id)));
    }

    public ExamDto createExam(CreateExamRequest request) {
        if (examRepository.existsById(request.getId())) {
            throw new IllegalArgumentException("Exam with id: " + request.getId() + " already exists");
        }

        var category = categoryRepository.findById(request.getCategory())
                .orElseThrow(() -> new IllegalArgumentException("Invalid category"));

        Exam exam = examMapper.toEntity(request);
        exam.setCategory(category);
        return examMapper.toExamDto(examRepository.save(exam));
    }

    public void deleteExam(String id) {
        examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", id));
        examRepository.deleteById(id);
    }

    public ExamDto updateExam(String id, UpdateExamRequest request) {
        var exam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", id));
        var category = categoryRepository.findById(request.getCategory())
                .orElseThrow(() -> new IllegalArgumentException("Invalid category"));

        examMapper.update(request, exam);
        exam.setCategory(category);
        return examMapper.toExamDto(examRepository.save(exam));
    }
}