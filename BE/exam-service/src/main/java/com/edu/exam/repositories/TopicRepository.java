package com.edu.exam.repositories;

import com.edu.exam.entities.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TopicRepository extends JpaRepository<Topic, String> {
    Optional<Topic> findByNameAndExamType(String name, String examType);
}
