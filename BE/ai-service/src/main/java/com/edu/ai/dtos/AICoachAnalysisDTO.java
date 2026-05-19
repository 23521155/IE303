package com.edu.ai.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AICoachAnalysisDTO {
    private List<NodeDTO> nodes;
    private List<EdgeDTO> edges;
}
