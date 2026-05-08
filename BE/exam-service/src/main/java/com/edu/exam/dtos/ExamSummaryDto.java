package com.edu.exam.dtos;

import java.util.Map;

public record ExamSummaryDto(
        String id,
        Map<String, String> title,
        String image,
        Integer duration,
        Map<String, String> description,
        Integer questionCount
) {
}
