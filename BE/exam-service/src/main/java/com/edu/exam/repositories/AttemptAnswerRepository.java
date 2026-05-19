package com.edu.exam.repositories;

import com.edu.exam.entities.AttemptAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttemptAnswerRepository extends JpaRepository<AttemptAnswer, String> {
    List<AttemptAnswer> findByAttemptId(String attemptId);

    @Query("""
            SELECT aa FROM AttemptAnswer aa
            JOIN aa.attempt a
            WHERE a.userId = :userId
            """)
    List<AttemptAnswer> findAllByUserId(@Param("userId") String userId);

    @Query("""
            SELECT aa FROM AttemptAnswer aa
            JOIN aa.attempt a
            JOIN Question q ON aa.questionId = q.id
            WHERE a.userId = :userId AND q.topic.id = :topicId
            """)
    List<AttemptAnswer> findByUserIdAndTopicId(@Param("userId") String userId, @Param("topicId") String topicId);

    @Query("""
            SELECT q.topic.id, COUNT(aa.id),
                SUM(CASE WHEN aa.isCorrect = true THEN 1 ELSE 0 END)
            FROM AttemptAnswer aa
            JOIN aa.attempt a
            JOIN Question q ON aa.questionId = q.id
            WHERE a.userId = :userId
            GROUP BY q.topic.id
            """)
    List<Object[]> findTopicStatsByUserId(@Param("userId") String userId);
}

