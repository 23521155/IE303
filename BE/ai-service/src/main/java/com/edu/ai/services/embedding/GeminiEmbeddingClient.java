package com.edu.ai.services.embedding;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class GeminiEmbeddingClient implements EmbeddingClient {

    private static final String BASE_URL = "https://generativelanguage.googleapis.com";
    private static final String EMBED_PATH = "/v1beta/models/gemini-embedding-001:embedContent";
    private static final int MAX_RETRIES = 3;
    private static final long CALL_DELAY_MS = 700;   // ~85 RPM for batch ingest; skipped on single embed()

    private final RestClient restClient;
    private final String apiKey;

    public GeminiEmbeddingClient(@Value("${gemini.api-key}") String apiKey) {
        this.apiKey = apiKey;
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(10));
        factory.setReadTimeout(Duration.ofSeconds(30));
        this.restClient = RestClient.builder()
                .baseUrl(BASE_URL)
                .defaultHeader("content-type", "application/json")
                .requestFactory(factory)
                .build();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<float[]> batchEmbed(List<String> texts) {
        List<float[]> results = new ArrayList<>(texts.size());
        for (String text : texts) {
            results.add(embedWithDelay(text));
        }
        return results;
    }

    /**
     * Single embed for RAG query-time retrieval — fail fast, no retry.
     * Quota exhaustion should degrade gracefully, not add 15s latency.
     */
    @Override
    public float[] embed(String text) {
        return callApi(text);
    }

    /** Used by batchEmbed during ingest — adds delay and retries on 429. */
    private float[] embedWithDelay(String text) {
        float[] vec = embedWithRetry(text);
        try { Thread.sleep(CALL_DELAY_MS); } catch (InterruptedException ie) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Embedding interrupted", ie);
        }
        return vec;
    }

    @SuppressWarnings("unchecked")
    private float[] callApi(String text) {
        Map<String, Object> body = Map.of(
                "content", Map.of("parts", List.of(Map.of("text", text)))
        );
        Map<?, ?> response = restClient.post()
                .uri(EMBED_PATH + "?key=" + apiKey)
                .body(body)
                .retrieve()
                .body(Map.class);

        Map<?, ?> embedding = (Map<?, ?>) response.get("embedding");
        List<Number> values = (List<Number>) embedding.get("values");
        float[] arr = new float[values.size()];
        for (int i = 0; i < values.size(); i++) arr[i] = values.get(i).floatValue();
        return arr;
    }

    private float[] embedWithRetry(String text) {
        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                return callApi(text);
            } catch (Exception e) {
                String msg = e.getMessage() != null ? e.getMessage() : "";
                if (msg.contains("429") && attempt < MAX_RETRIES) {
                    long wait = attempt * 5000L;
                    log.warn("Rate limited (429), retry {}/{} after {}s", attempt, MAX_RETRIES, wait / 1000);
                    try { Thread.sleep(wait); } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        throw new RuntimeException("Embedding interrupted", ie);
                    }
                } else {
                    log.error("Gemini embedContent failed (attempt {}): {}", attempt, msg);
                    throw new RuntimeException("Embedding API call failed", e);
                }
            }
        }
        throw new RuntimeException("Embedding API call failed after " + MAX_RETRIES + " retries");
    }
}
