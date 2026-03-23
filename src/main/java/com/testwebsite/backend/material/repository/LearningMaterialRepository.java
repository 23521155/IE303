package com.testwebsite.backend.material.repository;

import com.testwebsite.backend.material.entity.LearningMaterial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningMaterialRepository extends JpaRepository<LearningMaterial, Long> {

    Page<LearningMaterial> findByCategory(String category, Pageable pageable);

    Page<LearningMaterial> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    Page<LearningMaterial> findByType(String type, Pageable pageable);

    List<LearningMaterial> findTop10ByOrderByCreatedAtDesc();
}
