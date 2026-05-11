package com.edu.api_gateway.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Data
@Component
@ConfigurationProperties(prefix = "gateway.security")
public class GatewaySecurityProperties {

    // Paths that skip JWT check entirely, e.g. /api/auth/**, /actuator/**
    private List<String> excludedPaths = new ArrayList<>();

    // Paths that require a valid JWT. Format: "METHOD:/ant/path/**"
    // e.g. "POST:/api/exams/*/submit". Other paths allow optional token.
    private List<String> protectedPaths = new ArrayList<>();
}
