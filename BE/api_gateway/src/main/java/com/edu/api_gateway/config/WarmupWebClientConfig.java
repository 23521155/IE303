package com.edu.api_gateway.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WarmupWebClientConfig {

    @Bean(name = "warmupWebClientBuilder")
    @LoadBalanced
    public WebClient.Builder warmupWebClientBuilder() {
        return WebClient.builder();
    }
}
