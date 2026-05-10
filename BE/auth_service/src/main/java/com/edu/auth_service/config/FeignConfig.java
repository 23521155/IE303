package com.edu.auth_service.config;

import com.edu.auth_service.client.decoder.UserServiceErrorDecoder;
import feign.codec.ErrorDecoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {

    @Bean
    public ErrorDecoder errorDecoder() {
        return new UserServiceErrorDecoder();
    }
}
