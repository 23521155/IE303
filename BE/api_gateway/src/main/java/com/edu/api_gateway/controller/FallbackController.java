package com.edu.api_gateway.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @RequestMapping("/service-unavailable")
    public Mono<ResponseEntity<Map<String, Object>>> serviceUnavailable(ServerWebExchange exchange) {
        String originalPath = exchange.getRequest().getHeaders().getFirst("X-Forwarded-Path");
        if (originalPath == null) originalPath = exchange.getRequest().getPath().value();

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("success", false);
        body.put("statusCode", 503);
        body.put("message", "Dịch vụ tạm thời không khả dụng, vui lòng thử lại sau");
        body.put("path", originalPath);
        body.put("timestamp", Instant.now().toString());

        return Mono.just(ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(body));
    }
}
