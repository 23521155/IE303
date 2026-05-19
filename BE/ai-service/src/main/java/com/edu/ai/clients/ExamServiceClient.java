package com.edu.ai.clients;

import com.edu.ai.dtos.AICoachAnalysisDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "exam-service")
public interface ExamServiceClient {

    @GetMapping("/api/ai-coach/{userId}/analysis")
    AICoachAnalysisDTO getAnalysis(@PathVariable("userId") String userId);
}
