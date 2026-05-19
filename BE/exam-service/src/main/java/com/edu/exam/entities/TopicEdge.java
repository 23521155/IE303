package com.edu.exam.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "topic_edges")
public class TopicEdge {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, length = 50)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "from_topic_id", nullable = false)
    private Topic fromTopic;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "to_topic_id", nullable = false)
    private Topic toTopic;

    // "PREREQUISITE", "RELATED"
    @Column(name = "relation_type", nullable = false, length = 50)
    private String relationType;
}