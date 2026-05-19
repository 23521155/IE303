package com.edu.exam.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NodeDTO {
    private String id;
    private String name;
    private Double masteryScore;
    private Double errorRate;
    private Integer totalAttempts;
    private String categoryName;
}
