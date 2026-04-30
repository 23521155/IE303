package com.testwebsite.backend.blog.dto;

import lombok.Data;
import java.util.List;

@Data
public class ThreadActionRequest {
    private Long authorId;
    private String content;
    private List<String> mediaUrls;
}
