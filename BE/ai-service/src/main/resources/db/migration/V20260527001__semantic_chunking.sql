-- =====================================================================
-- Semantic Chunking support
--
-- 1. Snapshot the existing word-window chunks into a backup table so we
--    can always roll back / compare against the original ingest.
-- 2. Add a chunk_strategy column to knowledge_chunks so we can store the
--    new semantic chunks alongside the existing word-window chunks.
-- 3. Replace the uniqueness constraint to include chunk_strategy so the
--    two strategies do not collide on (source_type, source_id, chunk_index).
-- =====================================================================

-- 1. Backup snapshot of current (word-window) chunks.
--    CREATE TABLE ... AS copies data + column defs (no constraints/indexes),
--    which is exactly what we want for an immutable backup snapshot.
CREATE TABLE IF NOT EXISTS knowledge_chunks_backup_word_window
    AS TABLE knowledge_chunks;

-- 2. Add chunk_strategy column. Existing rows are word-window chunks.
ALTER TABLE knowledge_chunks
    ADD COLUMN IF NOT EXISTS chunk_strategy VARCHAR(32) NOT NULL DEFAULT 'WORD_WINDOW';

-- 3. Replace the uniqueness constraint so both strategies can coexist.
ALTER TABLE knowledge_chunks
    DROP CONSTRAINT IF EXISTS uq_chunk;

ALTER TABLE knowledge_chunks
    ADD CONSTRAINT uq_chunk
    UNIQUE (source_type, source_id, chunk_index, chunk_strategy);

-- 4. Helper index for filtering retrieval by strategy.
CREATE INDEX IF NOT EXISTS idx_chunks_strategy
    ON knowledge_chunks (chunk_strategy);
