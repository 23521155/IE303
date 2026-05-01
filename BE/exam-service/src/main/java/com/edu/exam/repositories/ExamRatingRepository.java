package com.edu.exam.repositories;

import com.edu.exam.entities.ExamRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ExamRatingRepository extends JpaRepository<ExamRating, String> {
    Optional<ExamRating> findByExam_IdAndUserId(String examId, String userId);

    @Query(value = "SELECT AVG(r.rating) AS avg, COUNT(r.rating) AS count FROM exam_ratings r WHERE r.exam_id = :examId", nativeQuery = true)
    RatingAggregateDto getAggregateRating(@Param("examId") String examId);

    interface RatingAggregateDto {
        Double getAvg();
        Integer getCount();
    }
}
