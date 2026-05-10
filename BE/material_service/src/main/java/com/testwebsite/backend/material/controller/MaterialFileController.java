package com.testwebsite.backend.material.controller;

import com.testwebsite.backend.material.entity.LearningMaterial;
import com.testwebsite.backend.material.exception.ResourceNotFoundException;
import com.testwebsite.backend.material.repository.LearningMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/materials")
@RequiredArgsConstructor
public class MaterialFileController {

    private final LearningMaterialRepository materialRepository;

    @Value("${file.base-path}")
    private String basePath;

    /**
     * Serve PDF file inline (view in browser) or as attachment (download).
     * GET /api/materials/{id}/file               → inline (view)
     * GET /api/materials/{id}/file?download=true → attachment (download)
     * Supports HTTP Range requests (206 Partial Content) for efficient PDF streaming.
     * Browser cache: 24h via Cache-Control public header.
     */
    @GetMapping("/{id}/file")
    public ResponseEntity<?> serveFile(
            @PathVariable Long id,
            @RequestParam(defaultValue = "false") boolean download,
            @RequestHeader HttpHeaders requestHeaders) throws IOException {

        LearningMaterial material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material not found: " + id));

        String fileUrl = material.getFileUrl();

        // Strip leading slashes so Paths.resolve() always treats it as relative to basePath
        String relativePath = fileUrl == null ? "" : fileUrl.replaceAll("^[/\\\\]+", "");
        Path filePath = Paths.get(basePath).resolve(relativePath).normalize();
        File file = filePath.toFile();

        log.info("[FILE] id={} | fileUrl='{}' | basePath='{}' | resolved='{}'  | exists={}",
                id, fileUrl, basePath, file.getAbsolutePath(), file.exists());

        if (!file.exists() || !file.isFile()) {
            log.warn("[FILE] NOT FOUND: {}", file.getAbsolutePath());
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(file);
        long contentLength = resource.contentLength();

        String contentDisposition = download
                ? "attachment; filename=\"" + file.getName() + "\""
                : "inline; filename=\"" + file.getName() + "\"";

        List<HttpRange> ranges = requestHeaders.getRange();

        if (!ranges.isEmpty()) {
            HttpRange range = ranges.get(0);
            long start = range.getRangeStart(contentLength);
            long end = range.getRangeEnd(contentLength);
            ResourceRegion region = new ResourceRegion(resource, start, end - start + 1);
            return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                    .header(HttpHeaders.CACHE_CONTROL, "public, max-age=86400")
                    .header(HttpHeaders.ACCEPT_RANGES, "bytes")
                    .body(region);
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                .header(HttpHeaders.CACHE_CONTROL, "public, max-age=86400")
                .header(HttpHeaders.ACCEPT_RANGES, "bytes")
                .body(resource);
    }
}
