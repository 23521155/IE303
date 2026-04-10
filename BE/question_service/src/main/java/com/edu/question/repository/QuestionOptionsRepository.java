package com.edu.question.repository;

import com.edu.question.entities.QuestionOptions;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionOptionsRepository extends JpaRepository<QuestionOptions, Integer> {

    List<QuestionOptions> findByQuestionQuestionId(Integer questionId);

    List<QuestionOptions> findByQuestionQuestionIdAndIsCorrect(Integer questionId, Boolean isCorrect);
}
