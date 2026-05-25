package com.edu.ai.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class LearningPathOutput {

    // CoT field: deserialized from LLM JSON but NOT serialized to FE
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String reasoning;

    private int totalDays;
    private List<DayPlan> dailyPlan;
    private List<WeeklyMilestone> weeklyMilestones;
    private List<CitedSource> citedSources;
    private String confidence;

    @Data
    @NoArgsConstructor
    public static class DayPlan {
        private int day;
        private String focusTopic;
        private String goal;
        private List<Task> tasks;
        private int totalMinutes;

        @Data
        @NoArgsConstructor
        public static class Task {
            private String type;   // READ | PRACTICE | REVIEW
            private String ref;    // MATERIAL#id | QUESTION#id | SELF_STUDY
            private int minutes;
        }
    }

    @Data
    @NoArgsConstructor
    public static class WeeklyMilestone {
        private int week;
        private String milestone;
    }

    @Data
    @NoArgsConstructor
    public static class CitedSource {
        private String sourceType;
        private String sourceId;
        private String snippet;
    }
}
