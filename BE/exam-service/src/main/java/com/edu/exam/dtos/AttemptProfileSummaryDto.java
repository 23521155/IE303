package com.edu.exam.dtos;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AttemptProfileSummaryDto {
    private long completedCount;
    private long totalPracticeSeconds;
    private List<AttemptListItemDto> recentAttempts;
}
