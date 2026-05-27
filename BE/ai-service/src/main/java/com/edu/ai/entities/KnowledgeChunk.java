package com.edu.ai.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnTransformer;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Table(name = "knowledge_chunks")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KnowledgeChunk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** BOOK | EXAM_QUESTION */
    @Column(name = "source_type", nullable = false, length = 32)
    private String sourceType;

    /** Filename stem, e.g. "FE_Exam_Preparation_Book_VOL1" */
    @Column(name = "source_id", nullable = false, length = 128)
    private String sourceId;

    @Column(name = "topic_id", length = 64)
    private String topicId;

    @Column(name = "topic_name")
    private String topicName;

    /** "en" — all materials are in English */
    @Column(nullable = false, length = 8)
    private String lang;

    @Column(name = "chunk_index", nullable = false)
    private int chunkIndex;

    /** WORD_WINDOW | SEMANTIC — see ChunkingStrategy. */
    @Column(name = "chunk_strategy", nullable = false, length = 32)
    private String chunkStrategy;

    @Column(name = "chunk_text", nullable = false, columnDefinition = "TEXT")
    private String chunkText;

    @Column(name = "token_count")
    private Integer tokenCount;

    /**
     * pgvector text format: "[0.1,0.2,...]"
     * Stored as vector(768) in DB; PostgreSQL JDBC returns the text representation
     * via PGobject.getValue() so String mapping works for read/write.
     */
    @Column(name = "embedding", nullable = false, columnDefinition = "vector(3072)")
    @ColumnTransformer(write = "?::vector")
    private String embedding;

    /** JSON string for extra metadata, e.g. {"exam_code":"2019A_FE_AM"} */
    @Column(columnDefinition = "TEXT")
    private String metadata;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}
