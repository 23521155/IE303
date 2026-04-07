package com.edu.question.repository;

import com.edu.question.entities.QuestionTags;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionTagsRepository extends JpaRepository<QuestionTags, Integer> {

    Optional<QuestionTags> findByTagName(String tagName);
}
