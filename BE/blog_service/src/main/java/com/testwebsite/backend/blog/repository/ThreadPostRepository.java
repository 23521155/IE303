package com.testwebsite.backend.blog.repository;

import com.testwebsite.backend.blog.entity.ThreadPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ThreadPostRepository extends JpaRepository<ThreadPost, Long> {
    
    // Get main threads for feed (no parent, no repost, no quote - just pure main posts)
    // Actually, in Threads, feed includes posts, reposts, and quotes, but NO replies.
    Page<ThreadPost> findByParentThreadIdIsNull(Pageable pageable);

    // Get all replies for a specific thread
    List<ThreadPost> findByParentThreadIdOrderByCreatedAtAsc(Long parentThreadId);
    
    // Find all by author
    Page<ThreadPost> findByAuthorId(Long authorId, Pageable pageable);
}
