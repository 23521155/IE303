package com.edu.ai.services.ingest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public final class TextChunker {

    private TextChunker() {}

    /**
     * Splits text into overlapping word-based windows.
     *
     * @param text         raw extracted text
     * @param windowWords  max words per chunk
     * @param overlapWords words to repeat from previous chunk
     * @param minWords     discard chunks shorter than this
     */
    public static List<String> chunk(String text, int windowWords, int overlapWords, int minWords) {
        String normalized = text.replaceAll("[\\t\\r\\n]+", " ")
                                .replaceAll("\\s{2,}", " ")
                                .trim();
        if (normalized.isBlank()) return List.of();

        String[] words = normalized.split(" ");
        int step = Math.max(1, windowWords - overlapWords);
        List<String> chunks = new ArrayList<>();

        for (int i = 0; i < words.length; i += step) {
            int end = Math.min(i + windowWords, words.length);
            String[] slice = Arrays.copyOfRange(words, i, end);

            if (slice.length >= minWords) {
                chunks.add(String.join(" ", slice));
            }

            if (end == words.length) break;
        }

        return chunks;
    }
}
