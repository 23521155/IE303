package com.testwebsite.backend.blog.dto;

import com.testwebsite.backend.blog.entity.ThreadPost;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ThreadDto {
    private Long id;
    private Long authorId;
    private String content;
    private List<String> mediaUrls;
    
    private Long parentThreadId;
    private Long repostThreadId;
    private Long quoteThreadId;

    private Integer likesCount;
    private Integer repliesCount;
    private Integer repostsCount;
    private Integer quotesCount;

    private LocalDateTime createdAt;
    
    // Optional: Include replies if fetching detailed view
    private List<ThreadDto> replies;

    public static ThreadDto fromEntity(ThreadPost post) {
        if (post == null) return null;
        ThreadDto dto = new ThreadDto();
        dto.setId(post.getId());
        dto.setAuthorId(post.getAuthorId());
        dto.setContent(post.getContent());
        dto.setMediaUrls(post.getMediaUrls());
        dto.setParentThreadId(post.getParentThreadId());
        dto.setRepostThreadId(post.getRepostThreadId());
        dto.setQuoteThreadId(post.getQuoteThreadId());
        dto.setLikesCount(post.getLikesCount());
        dto.setRepliesCount(post.getRepliesCount());
        dto.setRepostsCount(post.getRepostsCount());
        dto.setQuotesCount(post.getQuotesCount());
        dto.setCreatedAt(post.getCreatedAt());
        return dto;
    }
}
