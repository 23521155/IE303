package com.testwebsite.backend.material.controller;

import com.testwebsite.backend.material.entity.LearningMaterial;
import com.testwebsite.backend.material.exception.ResourceNotFoundException;
import com.testwebsite.backend.material.repository.LearningMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

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
     * GET /api/materials/{id}/file          → inline (view)
     * GET /api/materials/{id}/file?download=true  → attachment (download)
     */
    @GetMapping("/{id}/file")
    public ResponseEntity<?> serveFile(
            @PathVariable Long id,
            @RequestParam(defaultValue = "false") boolean download) {

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

        String contentDisposition = download
                ? "attachment; filename=\"" + file.getName() + "\""
                : "inline; filename=\"" + file.getName() + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                .body(resource);
    }
}
