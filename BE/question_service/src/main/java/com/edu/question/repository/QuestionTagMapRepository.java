package com.edu.question.repository;

import com.edu.question.entities.QuestionTagMap;
import com.edu.question.entities.QuestionTagMapId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionTagMapRepository extends JpaRepository<QuestionTagMap, QuestionTagMapId> {

    List<QuestionTagMap> findByQuestionId(Integer questionId);

    List<QuestionTagMap> findByTagId(Integer tagId);
}
