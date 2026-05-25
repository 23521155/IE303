package com.edu.ai.services;

import com.edu.ai.entities.KnowledgeChunk;
import com.edu.ai.repositories.KnowledgeChunkRepository;
import com.edu.ai.services.embedding.EmbeddingClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class RagService {

    private final EmbeddingClient embeddingClient;
    private final KnowledgeChunkRepository chunkRepository;

    @Value("${rag.retrieval.top-k:6}")
    private int topK;

    // Cache: query string → vector string "[0.1,0.2,...]"
    private final Map<String, String> vectorCache = new ConcurrentHashMap<>();

    public RagService(EmbeddingClient embeddingClient, KnowledgeChunkRepository chunkRepository) {
        this.embeddingClient = embeddingClient;
        this.chunkRepository = chunkRepository;
    }

    /**
     * Retrieves top-K relevant chunks for a query.
     * Caches the query embedding to avoid repeated Gemini API calls for the same topic.
     * Returns null (graceful degradation) if embedding fails.
     */
    public String retrieveContext(String query) {
        try {
            String queryVec = vectorCache.computeIfAbsent(query, this::embedQuery);
            List<KnowledgeChunk> chunks = chunkRepository.findTopKSimilar(queryVec, null, topK);
            return buildContextBlock(chunks);
        } catch (Exception e) {
            log.warn("RAG retrieval failed for query '{}', proceeding without context: {}", query, e.getMessage());
            return null;
        }
    }

    /** Evict a cached vector (call if topic name changes). */
    public void evict(String query) {
        vectorCache.remove(query);
    }

    private String embedQuery(String query) {
        log.debug("Embedding query (cache miss): '{}'", query);
        float[] vec = embeddingClient.embed(query);
        return EmbeddingClient.toVectorString(vec);
    }

    private String buildContextBlock(List<KnowledgeChunk> chunks) {
        if (chunks == null || chunks.isEmpty()) return null;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < chunks.size(); i++) {
            sb.append("[").append(i + 1).append("] ").append(chunks.get(i).getChunkText().strip()).append("\n\n");
        }
        return sb.toString().strip();
    }
}
