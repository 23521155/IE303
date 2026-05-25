package com.edu.ai.controllers;

import com.edu.ai.repositories.KnowledgeChunkRepository;
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

    /** Trigger full ingest of all eligible PDFs from the configured source path. */
    @PostMapping("/ingest")
    public ResponseEntity<IngestResult> ingestAll() {
        log.info("Full ingest triggered");
        return ResponseEntity.ok(ingestService.ingestAll());
    }

    /** Quick stats — how many chunks are in the DB by type. */
    @GetMapping("/ingest/status")
    public ResponseEntity<Map<String, Long>> status() {
        return ResponseEntity.ok(Map.of(
                "total",     repository.countAll(),
                "books",     repository.countBySourceType("BOOK"),
                "questions", repository.countBySourceType("EXAM_QUESTION")
        ));
    }
}
