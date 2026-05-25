-- Enable pgvector extension (requires Neon/PostgreSQL with vector support)
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS knowledge_chunks (
    id              BIGSERIAL    PRIMARY KEY,
    source_type     VARCHAR(32)  NOT NULL,            -- 'BOOK' | 'EXAM_QUESTION'
    source_id       VARCHAR(128) NOT NULL,            -- filename stem, e.g. "FE_Exam_Preparation_Book_VOL1"
    topic_id        VARCHAR(64),                      -- optional link to knowledge graph node
    topic_name      VARCHAR(255),
    lang            VARCHAR(8)   NOT NULL DEFAULT 'en',
    chunk_index     INT          NOT NULL,
    chunk_text      TEXT         NOT NULL,
    token_count     INT,
    embedding       vector(768)  NOT NULL,            -- Gemini text-embedding-004
    metadata        TEXT,                             -- JSON string, e.g. {"exam_code":"2019A_FE_AM"}
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_chunk UNIQUE (source_type, source_id, chunk_index)
);

CREATE INDEX IF NOT EXISTS idx_chunks_topic
    ON knowledge_chunks (topic_id);

CREATE INDEX IF NOT EXISTS idx_chunks_source
    ON knowledge_chunks (source_type, source_id);

-- HNSW index for fast cosine similarity search
-- m=16, ef_construction=64 is a good default for ~5k rows
CREATE INDEX IF NOT EXISTS idx_chunks_hnsw
    ON knowledge_chunks
    USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 64);
