package com.edu.ai.services.ingest;

import java.util.List;

public record IngestResult(
        int totalFiles,
        int processedFiles,
        int skippedFiles,
        int newChunks,
        long totalChunksInDb,
        List<String> errors
) {}
