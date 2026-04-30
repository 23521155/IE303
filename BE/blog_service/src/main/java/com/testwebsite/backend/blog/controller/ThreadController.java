package com.testwebsite.backend.blog.controller;

import com.testwebsite.backend.blog.dto.ThreadActionRequest;
import com.testwebsite.backend.blog.dto.ThreadDto;
import com.testwebsite.backend.blog.service.ThreadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/threads")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {
    RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
    RequestMethod.DELETE, RequestMethod.OPTIONS
})
public class ThreadController {

    private final ThreadService threadService;

    @GetMapping
    public ResponseEntity<Page<ThreadDto>> getFeed(Pageable pageable) {
        return ResponseEntity.ok(threadService.getFeed(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThreadDto> getThreadDetail(@PathVariable Long id) {
        return ResponseEntity.ok(threadService.getThreadDetail(id));
    }

    @PostMapping
    public ResponseEntity<ThreadDto> createPost(@RequestBody ThreadActionRequest request) {
        return ResponseEntity.ok(threadService.createPost(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ThreadDto> updateThread(@PathVariable Long id, @RequestBody ThreadActionRequest request) {
        return ResponseEntity.ok(threadService.updateThread(id, request));
    }

    @PostMapping("/{id}/reply")
    public ResponseEntity<ThreadDto> replyToThread(@PathVariable Long id, @RequestBody ThreadActionRequest request) {
        return ResponseEntity.ok(threadService.replyToThread(id, request));
    }

    @PostMapping("/{id}/repost")
    public ResponseEntity<ThreadDto> repostThread(@PathVariable Long id, @RequestBody ThreadActionRequest request) {
        return ResponseEntity.ok(threadService.repostThread(id, request));
    }

    @PostMapping("/{id}/quote")
    public ResponseEntity<ThreadDto> quoteThread(@PathVariable Long id, @RequestBody ThreadActionRequest request) {
        return ResponseEntity.ok(threadService.quoteThread(id, request));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Void> toggleLike(@PathVariable Long id, @RequestParam Long userId) {
        threadService.toggleLike(id, userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteThread(@PathVariable Long id, @RequestParam Long requesterId) {
        threadService.deleteThread(id, requesterId);
        return ResponseEntity.noContent().build();
    }
}
