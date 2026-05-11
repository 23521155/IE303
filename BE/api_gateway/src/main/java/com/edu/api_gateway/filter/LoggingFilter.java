package com.edu.api_gateway.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Slf4j
@Component
public class LoggingFilter implements GlobalFilter, Ordered {

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String requestId = UUID.randomUUID().toString().replace("-", "").substring(0, 12);
        long startTime = System.currentTimeMillis();

        log.info("[{}] --> {} {}", requestId, request.getMethod(), request.getURI().getPath());

        exchange.getAttributes().put(ResponseWrapperFilter.START_TIME_ATTR, startTime);

        // Strip Accept-Encoding so upstream services return plain JSON (not gzip-compressed).
        // The gateway handles client-facing compression via server.compression settings.
        ServerWebExchange mutated = exchange.mutate()
                .request(request.mutate()
                        .header("X-Request-Id", requestId)
                        .headers(h -> h.remove(org.springframework.http.HttpHeaders.ACCEPT_ENCODING))
                        .build())
                .build();

        return chain.filter(mutated).doFinally(signal -> {
            long duration = System.currentTimeMillis() - startTime;
            int status = mutated.getResponse().getStatusCode() != null
                    ? mutated.getResponse().getStatusCode().value()
                    : 0;
            log.info("[{}] <-- {} {} {}ms", requestId, status, request.getURI().getPath(), duration);
        });
    }
}
