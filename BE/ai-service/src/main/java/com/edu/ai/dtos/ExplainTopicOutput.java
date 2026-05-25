package com.edu.ai.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ExplainTopicOutput {

    // CoT field: deserialized from LLM JSON but NOT serialized to FE
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String reasoning;

    private WhyDifficult whyDifficult;
    private ImprovementPlan improvementPlan;
    private List<PrerequisiteItem> prerequisiteOrder;
    private List<CitedSource> citedSources;
    private String confidence;

    @Data
    @NoArgsConstructor
    public static class WhyDifficult {
        private String summary;
        private List<String> points;
    }

    @Data
    @NoArgsConstructor
    public static class ImprovementPlan {
        private String summary;
        private List<Step> steps;

        @Data
        @NoArgsConstructor
        public static class Step {
            private int order;
            private String action;
            private int estimatedMinutes;
        }
    }

    @Data
    @NoArgsConstructor
    public static class PrerequisiteItem {
        private String topicName;
        private String reason;
    }

    @Data
    @NoArgsConstructor
    public static class CitedSource {
        private String sourceType;
        private String sourceId;
        private String snippet;
    }
}
