package com.edu.exam.repositories;

import com.edu.exam.entities.Attempt;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ExamAttemptRepository extends JpaRepository<Attempt, String> {
    @EntityGraph(attributePaths = {"answers", "exam", "exam.questions", "exam.category"})
    Optional<Attempt> findById(String id);

    @EntityGraph(attributePaths = {"exam", "exam.category"})
    List<Attempt> findByUserIdOrderByCreatedAtDesc(String userId, Pageable pageable);

    public interface AttemptStats {
        long getCompletedCount();
        long getTotalTimeSpent();
    }

    @Query("SELECT COUNT(a.id) AS completedCount, COALESCE(SUM(a.timeSpent), 0) AS totalTimeSpent " +
            "FROM Attempt a WHERE a.userId = :userId")
    AttemptStats getStatsByUserId(@Param("userId") String userId);
}