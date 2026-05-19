package com.edu.exam.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "user_topic_mastery", uniqueConstraints = {
        @UniqueConstraint(name = "uk_user_topic", columnNames = {"user_id", "topic_id"})
})
public class UserTopicMastery {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, length = 50)
    private String id;

    @Column(name = "user_id", nullable = false, length = 50)
    private String userId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @Column(name = "mastery_score", nullable = false)
    private Double masteryScore = 0.0; // 0-100%

    @Column(name = "error_rate", nullable = false)
    private Double errorRate = 0.0; // 0-100%

    @Column(name = "total_attempts", nullable = false)
    private Integer totalAttempts = 0;

    @Column(name = "correct_answers", nullable = false)
    private Integer correctAnswers = 0;

    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated = LocalDateTime.now();
}
