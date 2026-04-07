package com.edu.question.repository;

import com.edu.question.entities.Question;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

    List<Question> findByExamId(Integer examId);

    List<Question> findByTopic(String topic);

    List<Question> findByDifficulty(String difficulty);
}
