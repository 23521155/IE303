package com.edu.api_gateway.filter;

import com.edu.api_gateway.config.GatewaySecurityProperties;
import com.edu.api_gateway.security.JwtGatewayService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthGatewayFilter implements GlobalFilter, Ordered {

    private static final String COOKIE_NAME = "access_token";
    private static final String USER_ID_HEADER = "X-User-Id";
    private static final AntPathMatcher PATH_MATCHER = new AntPathMatcher();

    private final JwtGatewayService jwtService;
    private final GatewaySecurityProperties securityProperties;

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE + 3;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getPath().value();
        HttpMethod method = request.getMethod();

        // Always pass OPTIONS through — CORS preflight has no credentials
        if (HttpMethod.OPTIONS.equals(method)) {
            return chain.filter(exchange);
        }

        // Excluded paths: skip JWT logic entirely
        if (isExcluded(path)) {
            return chain.filter(exchange);
        }

        // Extract and verify token
        String token = extractToken(request);
        String userId = (token != null) ? jwtService.extractUserIdIfValid(token) : null;

        if (userId == null) {
            if (isProtected(path, method)) {
                log.debug("JWT auth: 401 for {} {}", method, path);
                return writeUnauthorized(exchange);
            }
            return chain.filter(exchange);
        }

        // Valid token: forward userId to downstream via header
        log.debug("JWT auth: userId={} → {} {}", userId, method, path);
        ServerWebExchange mutated = exchange.mutate()
                .request(r -> r.headers(h -> h.set(USER_ID_HEADER, userId)))
                .build();
        return chain.filter(mutated);
    }

    private boolean isExcluded(String path) {
        return securityProperties.getExcludedPaths().stream()
                .anyMatch(pattern -> PATH_MATCHER.match(pattern, path));
    }

    private boolean isProtected(String path, HttpMethod method) {
        return securityProperties.getProtectedPaths().stream().anyMatch(entry -> {
            int colon = entry.indexOf(':');
            if (colon < 0) return false;
            String m = entry.substring(0, colon);
            String p = entry.substring(colon + 1);
            return method != null
                    && method.name().equalsIgnoreCase(m)
                    && PATH_MATCHER.match(p, path);
        });
    }

    private String extractToken(ServerHttpRequest request) {
        List<HttpCookie> cookies = request.getCookies().get(COOKIE_NAME);
        if (cookies != null && !cookies.isEmpty()) {
            return cookies.get(0).getValue();
        }
        return null;
    }

    private Mono<Void> writeUnauthorized(ServerWebExchange exchange) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
        byte[] body = "{\"message\":\"Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn\"}"
                .getBytes(StandardCharsets.UTF_8);
        DataBuffer buffer = response.bufferFactory().wrap(body);
        return response.writeWith(Mono.just(buffer));
    }
}
