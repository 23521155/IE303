package com.edu.ai.services.ingest;

/**
 * How a document is split into chunks before embedding.
 *
 * <ul>
 *   <li>{@link #WORD_WINDOW} — fixed-size sliding window over words (original strategy).</li>
 *   <li>{@link #SEMANTIC} — split on semantic similarity drops between sentences.</li>
 * </ul>
 */
public enum ChunkingStrategy {
    WORD_WINDOW,
    SEMANTIC;

    public static ChunkingStrategy fromString(String value) {
        if (value == null || value.isBlank()) return WORD_WINDOW;
        return ChunkingStrategy.valueOf(value.trim().toUpperCase());
    }
}
