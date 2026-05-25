package com.edu.ai.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NodeExplanationResponse {
    private String topicId;
    private ExplainTopicOutput output;
    private List<String> prerequisites;
    private List<String> relatedTopics;
}
