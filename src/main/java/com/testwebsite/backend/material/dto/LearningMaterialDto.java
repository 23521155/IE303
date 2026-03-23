package com.testwebsite.backend.material.dto;

import com.testwebsite.backend.material.entity.LearningMaterial;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class LearningMaterialDto {

    private Long id;
    private String title;
    private String category;
    private String imageUrl;
    private String description;
    private String fileUrl;
    private String type;
    private Instant createdAt;

    public static LearningMaterialDto fromEntity(LearningMaterial m) {
        return LearningMaterialDto.builder()
                .id(m.getId())
                .title(m.getTitle())
                .category(m.getCategory())
                .imageUrl(m.getImageUrl())
                .description(m.getDescription())
                .fileUrl(m.getFileUrl())
                .type(m.getType())
                .createdAt(m.getCreatedAt())
                .build();
    }
}
