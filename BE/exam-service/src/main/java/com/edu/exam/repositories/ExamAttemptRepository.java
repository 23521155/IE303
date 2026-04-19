package com.edu.exam.repositories;

import com.edu.exam.entities.Attempt;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExamAttemptRepository extends JpaRepository<Attempt, String> {
    @EntityGraph(attributePaths = {"answers", "exam", "exam.questions", "exam.category"})
    Optional<Attempt> findById(String id);
}