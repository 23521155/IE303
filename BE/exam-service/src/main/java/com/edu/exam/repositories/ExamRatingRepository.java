package com.edu.exam.repositories;

import com.edu.exam.entities.ExamRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ExamRatingRepository extends JpaRepository<ExamRating, String> {
    Optional<ExamRating> findByExam_IdAndUserId(String examId, String userId);

    @Query(value = "SELECT AVG(r.rating) FROM exam_ratings r WHERE r.exam_id = :examId", nativeQuery = true)
    Double getAverageRating(@Param("examId") String examId);

    @Query(value = "SELECT COUNT(*) FROM exam_ratings r WHERE r.exam_id = :examId", nativeQuery = true)
    int getRatingCount(@Param("examId") String examId);
}
