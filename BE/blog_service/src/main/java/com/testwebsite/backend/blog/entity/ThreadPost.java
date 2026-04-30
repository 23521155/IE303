package com.testwebsite.backend.blog.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "thread_posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThreadPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long authorId;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ElementCollection
    @CollectionTable(name = "thread_media", joinColumns = @JoinColumn(name = "thread_id"))
    @Column(name = "media_url", columnDefinition = "TEXT")
    @Builder.Default
    private List<String> mediaUrls = new ArrayList<>();

    // If not null, this Thread is a reply to another Thread
    private Long parentThreadId;

    // If not null, this Thread is a repost of another Thread
    private Long repostThreadId;

    // If not null, this Thread is a quote of another Thread
    private Long quoteThreadId;

    @Builder.Default
    private Integer likesCount = 0;

    @Builder.Default
    private Integer repliesCount = 0;

    @Builder.Default
    private Integer repostsCount = 0;

    @Builder.Default
    private Integer quotesCount = 0;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
