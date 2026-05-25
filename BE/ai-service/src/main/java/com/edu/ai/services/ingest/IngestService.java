package com.edu.ai.services.ingest;

import com.edu.ai.entities.KnowledgeChunk;
import com.edu.ai.repositories.KnowledgeChunkRepository;
import com.edu.ai.services.embedding.EmbeddingClient;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class IngestService {

    private final EmbeddingClient embeddingClient;
    private final KnowledgeChunkRepository repository;

    @Value("${rag.ingest.source-path:}")
    private String sourcePath;

    @Value("${rag.chunk.book-size:300}")
    private int bookChunkSize;

    @Value("${rag.chunk.book-overlap:60}")
    private int bookOverlap;

    @Value("${rag.chunk.question-size:230}")
    private int questionChunkSize;

    @Value("${rag.chunk.question-overlap:45}")
    private int questionOverlap;

    @Value("${rag.embedding.batch-size:32}")
    private int embBatchSize;

    @Value("${rag.ingest.min-chunk-words:30}")
    private int minChunkWords;

    public IngestService(EmbeddingClient embeddingClient, KnowledgeChunkRepository repository) {
        this.embeddingClient = embeddingClient;
        this.repository = repository;
    }

    /** Scans the configured source path and ingests all eligible PDFs. */
    public IngestResult ingestAll() {
        if (sourcePath == null || sourcePath.isBlank()) {
            return new IngestResult(0, 0, 0, 0, 0, List.of("RAG_SOURCE_PATH is not configured"));
        }

        List<Path> pdfFiles;
        try {
            pdfFiles = Files.walk(Path.of(sourcePath))
                    .filter(p -> p.toString().toLowerCase().endsWith(".pdf"))
                    .toList();
        } catch (IOException e) {
            log.error("Cannot scan source path '{}': {}", sourcePath, e.getMessage());
            return new IngestResult(0, 0, 0, 0, 0, List.of("Cannot scan path: " + e.getMessage()));
        }

        log.info("Found {} PDF files under {}", pdfFiles.size(), sourcePath);

        int processed = 0, skipped = 0, newChunks = 0;
        List<String> errors = new ArrayList<>();

        for (Path pdf : pdfFiles) {
            String filename = pdf.getFileName().toString();
            PdfSourceClassifier.PdfType type = PdfSourceClassifier.classify(filename);

            if (type == PdfSourceClassifier.PdfType.SKIP) {
                skipped++;
                continue;
            }

            try {
                int added = ingestFile(pdf, type);
                newChunks += added;
                processed++;
                log.info("[{}/{}] {} → {} new chunks", processed, pdfFiles.size(), filename, added);
            } catch (Exception e) {
                log.error("Failed to ingest {}: {}", filename, e.getMessage());
                errors.add(filename + ": " + e.getMessage());
                skipped++;
            }
        }

        long total = repository.countAll();
        log.info("Ingest complete. processed={}, skipped={}, newChunks={}, totalInDb={}",
                processed, skipped, newChunks, total);
        return new IngestResult(pdfFiles.size(), processed, skipped, newChunks, total, errors);
    }

    /** Ingests a single PDF file. Returns number of new chunks added. */
    public int ingestFile(Path pdfPath, PdfSourceClassifier.PdfType type) throws IOException {
        String filename = pdfPath.getFileName().toString();
        String sourceId = PdfSourceClassifier.sourceId(filename);
        String sourceType = type.name();

        String text = extractText(pdfPath);
        if (text == null || text.isBlank()) {
            log.warn("No text extracted from {}", filename);
            return 0;
        }

        int chunkSize = (type == PdfSourceClassifier.PdfType.BOOK) ? bookChunkSize : questionChunkSize;
        int overlap   = (type == PdfSourceClassifier.PdfType.BOOK) ? bookOverlap   : questionOverlap;
        List<String> chunks = TextChunker.chunk(text, chunkSize, overlap, minChunkWords);

        if (chunks.isEmpty()) {
            log.warn("Zero usable chunks from {}", filename);
            return 0;
        }

        String examCode = PdfSourceClassifier.examCode(pdfPath);
        String metadata = String.format("{\"exam_code\":\"%s\",\"filename\":\"%s\"}", examCode, filename);

        int newCount = 0;
        for (int i = 0; i < chunks.size(); i += embBatchSize) {
            int end = Math.min(i + embBatchSize, chunks.size());
            List<String> batch = chunks.subList(i, end);

            // Check DB first — only embed chunks that don't exist yet
            List<Integer> newLocalIndices = new ArrayList<>();
            List<String> chunksToEmbed = new ArrayList<>();
            for (int j = 0; j < batch.size(); j++) {
                int chunkIdx = i + j;
                if (!repository.existsBySourceTypeAndSourceIdAndChunkIndex(sourceType, sourceId, chunkIdx)) {
                    newLocalIndices.add(j);
                    chunksToEmbed.add(batch.get(j));
                }
            }

            if (chunksToEmbed.isEmpty()) continue;

            List<float[]> embeddings = embeddingClient.batchEmbed(chunksToEmbed);

            for (int k = 0; k < chunksToEmbed.size(); k++) {
                int j = newLocalIndices.get(k);
                int chunkIdx = i + j;
                KnowledgeChunk chunk = KnowledgeChunk.builder()
                        .sourceType(sourceType)
                        .sourceId(sourceId)
                        .lang("en")
                        .chunkIndex(chunkIdx)
                        .chunkText(chunksToEmbed.get(k))
                        .tokenCount(chunksToEmbed.get(k).split("\\s+").length)
                        .embedding(EmbeddingClient.toVectorString(embeddings.get(k)))
                        .metadata(metadata)
                        .build();
                repository.save(chunk);
                newCount++;
            }
        }

        return newCount;
    }

    private String extractText(Path pdfPath) throws IOException {
        try (PDDocument doc = Loader.loadPDF(pdfPath.toFile())) {
            return new PDFTextStripper().getText(doc);
        }
    }
}
