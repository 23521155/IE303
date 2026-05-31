package com.edu.ai.controllers;

import com.edu.ai.repositories.KnowledgeChunkRepository;
import com.edu.ai.services.ingest.ChunkingStrategy;
import com.edu.ai.services.ingest.IngestResult;
import com.edu.ai.services.ingest.IngestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai/admin")
@RequiredArgsConstructor
@Slf4j
public class IngestController {

    private final IngestService ingestService;
    private final KnowledgeChunkRepository repository;

    /**
     * Trigger full ingest of all eligible PDFs from the configured source path.
     * Pass {@code ?strategy=SEMANTIC} to use semantic chunking; defaults to
     * the original word-window strategy.
     */
    @PostMapping("/ingest")
    public ResponseEntity<IngestResult> ingestAll(
            @RequestParam(name = "strategy", required = false, defaultValue = "WORD_WINDOW") String strategy) {
        ChunkingStrategy parsed = ChunkingStrategy.fromString(strategy);
        log.info("Full ingest triggered (strategy={})", parsed);
        return ResponseEntity.ok(ingestService.ingestAll(parsed));
    }

    /** Quick stats — how many chunks are in the DB by type and by chunking strategy. */
    @GetMapping("/ingest/status")
    public ResponseEntity<Map<String, Object>> status() {
        return ResponseEntity.ok(Map.of(
                "total",         repository.countAll(),
                "books",         repository.countBySourceType("BOOK"),
                "questions",     repository.countBySourceType("EXAM_QUESTION"),
                "byStrategy",    Map.of(
                        "WORD_WINDOW", repository.countByChunkStrategy("WORD_WINDOW"),
                        "SEMANTIC",    repository.countByChunkStrategy("SEMANTIC")
                )
        ));
    }
}
