package com.edu.exam.repositories;

import com.edu.exam.entities.AttemptAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttemptAnswerRepository extends JpaRepository<AttemptAnswer, String> {
}