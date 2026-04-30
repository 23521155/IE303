package com.testwebsite.backend.blog.service;

import com.testwebsite.backend.blog.dto.ThreadActionRequest;
import com.testwebsite.backend.blog.dto.ThreadDto;
import com.testwebsite.backend.blog.entity.ThreadLike;
import com.testwebsite.backend.blog.entity.ThreadPost;
import com.testwebsite.backend.blog.repository.ThreadLikeRepository;
import com.testwebsite.backend.blog.repository.ThreadPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ThreadService {

    private final ThreadPostRepository threadPostRepository;
    private final ThreadLikeRepository threadLikeRepository;

    public Page<ThreadDto> getFeed(Pageable pageable) {
        return threadPostRepository.findByParentThreadIdIsNull(pageable)
                .map(ThreadDto::fromEntity);
    }

    public ThreadDto getThreadDetail(Long id) {
        ThreadPost post = threadPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Thread not found"));
        
        ThreadDto dto = ThreadDto.fromEntity(post);
        
        // Fetch replies
        List<ThreadPost> replies = threadPostRepository.findByParentThreadIdOrderByCreatedAtAsc(id);
        dto.setReplies(replies.stream().map(ThreadDto::fromEntity).collect(Collectors.toList()));
        
        return dto;
    }

    @Transactional
    public ThreadDto createPost(ThreadActionRequest request) {
        ThreadPost post = ThreadPost.builder()
                .authorId(request.getAuthorId())
                .content(request.getContent())
                .mediaUrls(request.getMediaUrls())
                .build();
        return ThreadDto.fromEntity(threadPostRepository.save(post));
    }

    @Transactional
    public ThreadDto replyToThread(Long parentId, ThreadActionRequest request) {
        ThreadPost parent = threadPostRepository.findById(parentId)
                .orElseThrow(() -> new RuntimeException("Parent thread not found"));

        ThreadPost reply = ThreadPost.builder()
                .authorId(request.getAuthorId())
                .content(request.getContent())
                .mediaUrls(request.getMediaUrls())
                .parentThreadId(parentId)
                .build();

        reply = threadPostRepository.save(reply);

        // Update parent reply count
        parent.setRepliesCount(parent.getRepliesCount() + 1);
        threadPostRepository.save(parent);

        return ThreadDto.fromEntity(reply);
    }

    @Transactional
    public ThreadDto repostThread(Long originalId, ThreadActionRequest request) {
        ThreadPost original = threadPostRepository.findById(originalId)
                .orElseThrow(() -> new RuntimeException("Original thread not found"));

        ThreadPost repost = ThreadPost.builder()
                .authorId(request.getAuthorId())
                .repostThreadId(originalId)
                .build();

        repost = threadPostRepository.save(repost);

        original.setRepostsCount(original.getRepostsCount() + 1);
        threadPostRepository.save(original);

        return ThreadDto.fromEntity(repost);
    }

    @Transactional
    public ThreadDto quoteThread(Long originalId, ThreadActionRequest request) {
        ThreadPost original = threadPostRepository.findById(originalId)
                .orElseThrow(() -> new RuntimeException("Original thread not found"));

        ThreadPost quote = ThreadPost.builder()
                .authorId(request.getAuthorId())
                .content(request.getContent())
                .mediaUrls(request.getMediaUrls())
                .quoteThreadId(originalId)
                .build();

        quote = threadPostRepository.save(quote);

        original.setQuotesCount(original.getQuotesCount() + 1);
        threadPostRepository.save(original);

        return ThreadDto.fromEntity(quote);
    }

    @Transactional
    public ThreadDto updateThread(Long id, ThreadActionRequest request) {
        ThreadPost thread = threadPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Thread not found"));

        if (!thread.getAuthorId().equals(request.getAuthorId())) {
            throw new RuntimeException("Not authorized to edit this thread");
        }

        if (request.getContent() != null) {
            thread.setContent(request.getContent());
        }
        // Always replace mediaUrls (even with empty list to clear them)
        if (request.getMediaUrls() != null) {
            List<String> current = thread.getMediaUrls();
            current.clear();
            current.addAll(request.getMediaUrls());
        }

        return ThreadDto.fromEntity(threadPostRepository.saveAndFlush(thread));
    }

    @Transactional
    public void toggleLike(Long threadId, Long userId) {
        ThreadPost thread = threadPostRepository.findById(threadId)
                .orElseThrow(() -> new RuntimeException("Thread not found"));

        boolean alreadyLiked = threadLikeRepository.existsByThreadIdAndUserId(threadId, userId);

        if (alreadyLiked) {
            threadLikeRepository.deleteByThreadIdAndUserId(threadId, userId);
            thread.setLikesCount(Math.max(0, thread.getLikesCount() - 1));
        } else {
            threadLikeRepository.save(ThreadLike.builder()
                    .threadId(threadId)
                    .userId(userId)
                    .build());
            thread.setLikesCount(thread.getLikesCount() + 1);
        }
        threadPostRepository.save(thread);
    }

    @Transactional
    public void deleteThread(Long id, Long requesterId) {
        ThreadPost thread = threadPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Thread not found"));

        if (!thread.getAuthorId().equals(requesterId)) {
            throw new RuntimeException("Not authorized to delete this thread");
        }
        
        // Note: Real apps usually soft delete or handle cascading carefully
        // Here we just delete directly for simplicity
        threadPostRepository.delete(thread);
    }
}
