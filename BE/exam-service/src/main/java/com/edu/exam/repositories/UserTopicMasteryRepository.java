package com.edu.exam.repositories;

import com.edu.exam.entities.UserTopicMastery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserTopicMasteryRepository extends JpaRepository<UserTopicMastery, String> {
    List<UserTopicMastery> findByUserId(String userId);

    Optional<UserTopicMastery> findByUserIdAndTopicId(String userId, String topicId);

    @Query("SELECT m FROM UserTopicMastery m WHERE m.userId = :userId ORDER BY m.masteryScore DESC")
    List<UserTopicMastery> findByUserIdOrderedByMasteryScore(@Param("userId") String userId);

    @Query("SELECT m FROM UserTopicMastery m WHERE m.userId = :userId AND m.masteryScore < :threshold")
    List<UserTopicMastery> findWeakTopics(@Param("userId") String userId, @Param("threshold") Double threshold);
}
