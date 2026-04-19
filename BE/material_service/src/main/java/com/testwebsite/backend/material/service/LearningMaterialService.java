package com.testwebsite.backend.material.service;

import com.testwebsite.backend.material.dto.LearningMaterialDto;
import com.testwebsite.backend.material.entity.LearningMaterial;
import com.testwebsite.backend.material.repository.LearningMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LearningMaterialService {

    private final LearningMaterialRepository materialRepository;

    public Page<LearningMaterialDto> findAll(String category, Pageable pageable) {
        Page<LearningMaterial> page = category == null || category.isBlank() || "all".equalsIgnoreCase(category)
                ? materialRepository.findAll(pageable)
                : materialRepository.findByCategory(category, pageable);
        return page.map(LearningMaterialDto::fromEntity);
    }

    public LearningMaterialDto findById(Long id) {
        LearningMaterial m = materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Learning material not found in Database: " + id));
        return LearningMaterialDto.fromEntity(m);
    }

    @Transactional
    public LearningMaterialDto create(LearningMaterialDto dto) {
        LearningMaterial m = LearningMaterial.builder()
                .title(dto.getTitle())
                .category(dto.getCategory())
                .imageUrl(dto.getImageUrl())
                .description(dto.getDescription())
                .fileUrl(dto.getFileUrl())
                .type(dto.getType())
                .build();
        m = materialRepository.save(m);
        return LearningMaterialDto.fromEntity(m);
    }

    @Transactional
    public LearningMaterialDto update(Long id, LearningMaterialDto dto) {
        LearningMaterial m = materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Learning material not found in Database: " + id));

        if (dto.getTitle() != null) m.setTitle(dto.getTitle());
        if (dto.getCategory() != null) m.setCategory(dto.getCategory());
        if (dto.getImageUrl() != null) m.setImageUrl(dto.getImageUrl());
        if (dto.getDescription() != null) m.setDescription(dto.getDescription());
        if (dto.getFileUrl() != null) m.setFileUrl(dto.getFileUrl());
        if (dto.getType() != null) m.setType(dto.getType());

        return LearningMaterialDto.fromEntity(m);
    }

    @Transactional
    public void delete(Long id) {
        if (!materialRepository.existsById(id)) {
            throw new RuntimeException("Learning material not found in Database: " + id);
        }
        materialRepository.deleteById(id);
    }

    public Page<LearningMaterialDto> searchByTitle(String title, String category, Pageable pageable) {
        if (category == null || category.isBlank() || "all".equalsIgnoreCase(category)) {
            return materialRepository.findByTitleContainingIgnoreCase(title, pageable)
                    .map(LearningMaterialDto::fromEntity);
        } else {
            return materialRepository.findByTitleContainingIgnoreCaseAndCategory(title, category, pageable)
                    .map(LearningMaterialDto::fromEntity);
        }
    }

    public Page<LearningMaterialDto> findByType(String type, Pageable pageable) {
        return materialRepository.findByType(type, pageable)
                .map(LearningMaterialDto::fromEntity);
    }

    public List<LearningMaterialDto> getRecentMaterials() {
        return materialRepository.findTop10ByOrderByCreatedAtDesc()
                .stream().map(LearningMaterialDto::fromEntity).collect(Collectors.toList());
    }
}