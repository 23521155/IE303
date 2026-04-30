package com.testwebsite.backend.blog.repository;

import com.testwebsite.backend.blog.entity.ThreadLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ThreadLikeRepository extends JpaRepository<ThreadLike, Long> {
    Optional<ThreadLike> findByThreadIdAndUserId(Long threadId, Long userId);
    void deleteByThreadIdAndUserId(Long threadId, Long userId);
    boolean existsByThreadIdAndUserId(Long threadId, Long userId);
}
