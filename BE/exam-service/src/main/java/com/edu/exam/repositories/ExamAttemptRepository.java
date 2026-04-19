package com.edu.exam.repositories;

import com.edu.exam.entities.Attempt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamAttemptRepository extends JpaRepository<Attempt, String> {
}