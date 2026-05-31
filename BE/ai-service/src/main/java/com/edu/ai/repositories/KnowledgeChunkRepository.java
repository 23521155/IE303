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
     * chunkStrategy is optional — pass null to search across all strategies.
     * queryVec must be in pgvector text format: "[0.1,0.2,...]"
     */
    @Query(value = """
            SELECT id, source_type, source_id, topic_id, topic_name, lang,
                   chunk_index, chunk_strategy, chunk_text, token_count,
                   embedding::text AS embedding,
                   metadata, created_at
            FROM knowledge_chunks
            WHERE (:topicId IS NULL OR topic_id = :topicId)
              AND (:chunkStrategy IS NULL OR chunk_strategy = :chunkStrategy)
            ORDER BY embedding <=> CAST(:queryVec AS vector)
            LIMIT :k
            """, nativeQuery = true)
    List<KnowledgeChunk> findTopKSimilar(
            @Param("queryVec") String queryVec,
            @Param("topicId") String topicId,
            @Param("chunkStrategy") String chunkStrategy,
            @Param("k") int k
    );

    boolean existsBySourceTypeAndSourceIdAndChunkIndexAndChunkStrategy(
            String sourceType, String sourceId, int chunkIndex, String chunkStrategy);

    /** Cheap file-level dedup: did this strategy already ingest anything for this source? */
    boolean existsBySourceTypeAndSourceIdAndChunkStrategy(
            String sourceType, String sourceId, String chunkStrategy);

    void deleteBySourceTypeAndSourceIdAndChunkStrategy(
            String sourceType, String sourceId, String chunkStrategy);

    @Query("SELECT COUNT(c) FROM KnowledgeChunk c WHERE c.sourceType = :sourceType")
    long countBySourceType(@Param("sourceType") String sourceType);

    @Query("SELECT COUNT(c) FROM KnowledgeChunk c WHERE c.chunkStrategy = :strategy")
    long countByChunkStrategy(@Param("strategy") String strategy);

    @Query("SELECT COUNT(c) FROM KnowledgeChunk c WHERE c.sourceType = :sourceType AND c.chunkStrategy = :strategy")
    long countBySourceTypeAndStrategy(@Param("sourceType") String sourceType,
                                      @Param("strategy") String strategy);

    @Query("SELECT COUNT(c) FROM KnowledgeChunk c")
    long countAll();
}
