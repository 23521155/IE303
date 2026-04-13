package com.testwebsite.backend.material.controller;

import com.testwebsite.backend.material.dto.LearningMaterialDto;
import com.testwebsite.backend.material.service.LearningMaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materials")
@RequiredArgsConstructor
public class LearningMaterialController {

    private final LearningMaterialService materialService;

    @GetMapping
    public ResponseEntity<Page<LearningMaterialDto>> list(
            @RequestParam(required = false) String category,
            Pageable pageable) {
        return ResponseEntity.ok(materialService.findAll(category, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningMaterialDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(materialService.findById(id));
    }

    @PostMapping
    public ResponseEntity<LearningMaterialDto> create(@RequestBody LearningMaterialDto dto) {
        return ResponseEntity.ok(materialService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningMaterialDto> update(@PathVariable Long id, @RequestBody LearningMaterialDto dto) {
        return ResponseEntity.ok(materialService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        materialService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Page<LearningMaterialDto>> search(
            @RequestParam String title,
            Pageable pageable) {
        return ResponseEntity.ok(materialService.searchByTitle(title, pageable));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<Page<LearningMaterialDto>> getByType(
            @PathVariable String type,
            Pageable pageable) {
        return ResponseEntity.ok(materialService.findByType(type, pageable));
    }

    @GetMapping("/recent")
    public ResponseEntity<List<LearningMaterialDto>> getRecent() {
        return ResponseEntity.ok(materialService.getRecentMaterials());
    }
}
