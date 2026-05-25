package com.edu.ai.services.embedding;

import java.util.List;

public interface EmbeddingClient {

    List<float[]> batchEmbed(List<String> texts);

    default float[] embed(String text) {
        return batchEmbed(List.of(text)).get(0);
    }

    static String toVectorString(float[] vec) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < vec.length; i++) {
            if (i > 0) sb.append(",");
            sb.append(vec[i]);
        }
        return sb.append("]").toString();
    }
}
