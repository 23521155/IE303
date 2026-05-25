package com.edu.ai.repositories;

import com.edu.ai.entities.KnowledgeChunk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KnowledgeChunkRepository extends JpaRepository<KnowledgeChunk, Long> {

    /**
     * Cosine similarity search using pgvector <=> operator.
     * topicId is optional — pass null to search across all topics (fallback).
     * queryVec must be in pgvector text format: "[0.1,0.2,...]"
     */
    @Query(value = """
            SELECT id, source_type, source_id, topic_id, topic_name, lang,
                   chunk_index, chunk_text, token_count,
                   embedding::text AS embedding,
                   metadata, created_at
            FROM knowledge_chunks
            WHERE (:topicId IS NULL OR topic_id = :topicId)
            ORDER BY embedding <=> CAST(:queryVec AS vector)
            LIMIT :k
            """, nativeQuery = true)
    List<KnowledgeChunk> findTopKSimilar(
            @Param("queryVec") String queryVec,
            @Param("topicId") String topicId,
            @Param("k") int k
    );

    boolean existsBySourceTypeAndSourceIdAndChunkIndex(
            String sourceType, String sourceId, int chunkIndex);

    void deleteBySourceTypeAndSourceId(String sourceType, String sourceId);

    @Query("SELECT COUNT(c) FROM KnowledgeChunk c WHERE c.sourceType = :sourceType")
    long countBySourceType(@Param("sourceType") String sourceType);

    @Query("SELECT COUNT(c) FROM KnowledgeChunk c")
    long countAll();
}
