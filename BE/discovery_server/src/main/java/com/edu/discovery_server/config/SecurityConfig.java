package com.edu.discovery_server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()); // Tắt CSRF để các service khác có thể đăng ký
        http.authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // Cho phép mọi request
        return http.build();
    }
}