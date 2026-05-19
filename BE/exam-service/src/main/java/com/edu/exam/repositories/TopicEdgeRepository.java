package com.edu.exam.repositories;

import com.edu.exam.entities.TopicEdge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TopicEdgeRepository extends JpaRepository<TopicEdge, String> {
    List<TopicEdge> findByFromTopicId(String fromTopicId);

    List<TopicEdge> findByToTopicId(String toTopicId);

    List<TopicEdge> findByRelationType(String relationType);

    @Query("SELECT e FROM TopicEdge e WHERE e.fromTopic.id = :topicId OR e.toTopic.id = :topicId")
    List<TopicEdge> findConnectedEdges(@Param("topicId") String topicId);

    @Query("SELECT e FROM TopicEdge e WHERE e.fromTopic.id = :topicId AND e.relationType = 'PREREQUISITE'")
    List<TopicEdge> findPrerequisites(@Param("topicId") String topicId);
}
