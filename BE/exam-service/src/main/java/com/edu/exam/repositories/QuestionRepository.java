package com.edu.exam.repositories;

import com.edu.exam.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, String> {
    List<Question> findByExamIdOrderByQuestionOrder(String examId);
}