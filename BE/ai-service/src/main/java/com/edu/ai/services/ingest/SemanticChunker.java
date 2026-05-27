package com.edu.ai.services.ingest;

import com.edu.ai.services.embedding.EmbeddingClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.text.BreakIterator;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

/**
 * Splits text into chunks where each chunk is a stretch of sentences that
 * remain semantically close to each other. Breakpoints are placed where the
 * cosine distance between consecutive contextualized sentences spikes — that
 * spike marks a topic shift.
 *
 * <p>Algorithm (inspired by LangChain SemanticChunker / LlamaIndex
 * SemanticSplitterNodeParser):
 * <ol>
 *   <li>Split the text into sentences using {@link BreakIterator}.</li>
 *   <li>For each sentence {@code i}, build a contextualized window by joining
 *       sentences in {@code [i-buffer, i+buffer]} — this denoises the
 *       embedding so a single short sentence does not look spuriously
 *       different from its neighbours.</li>
 *   <li>Embed every contextualized window.</li>
 *   <li>Compute the cosine distance between consecutive windows.</li>
 *   <li>Pick a threshold at {@code breakpointPercentile} of those distances
 *       and cut wherever the distance exceeds it.</li>
 *   <li>Merge the sentences between cuts back into chunks. Anything still
 *       larger than {@code maxWords} is rescued with a word-window split so
 *       embeddings do not blow past the model context.</li>
 * </ol>
 */
@Service
@Slf4j
public class SemanticChunker {

    private final EmbeddingClient embeddingClient;

    @Value("${rag.chunk.semantic.buffer-size:1}")
    private int bufferSize;

    @Value("${rag.chunk.semantic.breakpoint-percentile:90.0}")
    private double breakpointPercentile;

    @Value("${rag.chunk.semantic.min-words:30}")
    private int minWords;

    @Value("${rag.chunk.semantic.max-words:400}")
    private int maxWords;

    public SemanticChunker(EmbeddingClient embeddingClient) {
        this.embeddingClient = embeddingClient;
    }

    /** Convenience overload using the bean's configured defaults. */
    public List<String> chunk(String text) {
        return chunk(text, bufferSize, breakpointPercentile, minWords, maxWords);
    }

    /**
     * @param text                  raw extracted text
     * @param buffer                sentences of context to add on each side
     *                              when embedding (1 means the sentence plus
     *                              its left and right neighbour)
     * @param breakpointPct         percentile (0-100) of distances treated as
     *                              the cut threshold; higher = fewer, larger
     *                              chunks
     * @param minWords              discard chunks shorter than this
     * @param maxWords              fall back to a word-window split when a
     *                              semantic chunk is longer than this
     */
    public List<String> chunk(String text,
                              int buffer,
                              double breakpointPct,
                              int minWords,
                              int maxWords) {
        String normalized = normalize(text);
        if (normalized.isBlank()) return List.of();

        List<String> sentences = splitSentences(normalized);
        if (sentences.isEmpty()) return List.of();
        if (sentences.size() == 1) {
            return wordCount(sentences.get(0)) >= minWords ? sentences : List.of();
        }

        // Build contextualized windows: each window joins sentences around index i.
        List<String> windows = new ArrayList<>(sentences.size());
        for (int i = 0; i < sentences.size(); i++) {
            int from = Math.max(0, i - buffer);
            int to   = Math.min(sentences.size(), i + buffer + 1);
            windows.add(String.join(" ", sentences.subList(from, to)));
        }

        List<float[]> embeddings;
        try {
            embeddings = embeddingClient.batchEmbed(windows);
        } catch (Exception e) {
            log.warn("Semantic chunking failed to embed {} sentence windows, falling back to word-window: {}",
                    windows.size(), e.getMessage());
            return TextChunker.chunk(normalized, maxWords, Math.min(60, maxWords / 5), minWords);
        }

        double[] distances = new double[embeddings.size() - 1];
        for (int i = 0; i < distances.length; i++) {
            distances[i] = cosineDistance(embeddings.get(i), embeddings.get(i + 1));
        }

        double threshold = percentile(distances, breakpointPct);
        log.debug("Semantic chunking: {} sentences, {} distances, p{} threshold = {}",
                sentences.size(), distances.length, breakpointPct, threshold);

        // Breakpoint indices are sentence boundaries: cut between sentence i and i+1.
        List<Integer> cuts = new ArrayList<>();
        for (int i = 0; i < distances.length; i++) {
            if (distances[i] > threshold) cuts.add(i + 1);
        }

        List<String> rawChunks = new ArrayList<>();
        int start = 0;
        for (int cut : cuts) {
            rawChunks.add(String.join(" ", sentences.subList(start, cut)));
            start = cut;
        }
        if (start < sentences.size()) {
            rawChunks.add(String.join(" ", sentences.subList(start, sentences.size())));
        }

        // Enforce min/max word budgets. Oversized chunks fall back to a word-window
        // split so any one chunk stays within embedding-friendly limits.
        List<String> result = new ArrayList<>();
        for (String raw : rawChunks) {
            int words = wordCount(raw);
            if (words < minWords) continue;
            if (words <= maxWords) {
                result.add(raw);
            } else {
                result.addAll(TextChunker.chunk(raw, maxWords, Math.min(60, maxWords / 5), minWords));
            }
        }
        return result;
    }

    private static String normalize(String text) {
        if (text == null) return "";
        return text.replaceAll("[\\t\\r]+", " ")
                   .replaceAll("\\n{2,}", "\n")
                   .replaceAll("[ \\f]{2,}", " ")
                   .trim();
    }

    private static List<String> splitSentences(String text) {
        BreakIterator it = BreakIterator.getSentenceInstance(Locale.ENGLISH);
        it.setText(text);
        List<String> sentences = new ArrayList<>();
        int start = it.first();
        for (int end = it.next(); end != BreakIterator.DONE; start = end, end = it.next()) {
            String s = text.substring(start, end).replaceAll("\\s+", " ").trim();
            if (!s.isEmpty()) sentences.add(s);
        }
        return sentences;
    }

    private static int wordCount(String s) {
        if (s == null || s.isBlank()) return 0;
        return s.trim().split("\\s+").length;
    }

    private static double cosineDistance(float[] a, float[] b) {
        if (a == null || b == null || a.length != b.length) return 1.0;
        double dot = 0.0, na = 0.0, nb = 0.0;
        for (int i = 0; i < a.length; i++) {
            dot += a[i] * b[i];
            na  += a[i] * a[i];
            nb  += b[i] * b[i];
        }
        if (na == 0.0 || nb == 0.0) return 1.0;
        return 1.0 - dot / (Math.sqrt(na) * Math.sqrt(nb));
    }

    /** Nearest-rank percentile. Returns {@link Double#MAX_VALUE} on empty input. */
    private static double percentile(double[] values, double percentile) {
        if (values.length == 0) return Double.MAX_VALUE;
        double[] sorted = Arrays.copyOf(values, values.length);
        Arrays.sort(sorted);
        int idx = (int) Math.ceil(percentile / 100.0 * sorted.length) - 1;
        idx = Math.max(0, Math.min(idx, sorted.length - 1));
        return sorted[idx];
    }
}
