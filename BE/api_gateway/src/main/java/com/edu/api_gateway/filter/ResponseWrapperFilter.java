package com.edu.api_gateway.filter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.reactivestreams.Publisher;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpResponseDecorator;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Instant;

@Slf4j
@Component
@RequiredArgsConstructor
public class ResponseWrapperFilter implements GlobalFilter, Ordered {

    public static final String START_TIME_ATTR = "GATEWAY_START_TIME";

    private final ObjectMapper objectMapper;

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE + 2;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getPath().value();

        if (path.startsWith("/actuator") || path.startsWith("/fallback")) {
            return chain.filter(exchange);
        }

        ServerHttpResponseDecorator decorated = new ServerHttpResponseDecorator(exchange.getResponse()) {
            @Override
            public Mono<Void> writeWith(Publisher<? extends DataBuffer> body) {
                MediaType contentType = getHeaders().getContentType();
                log.debug("writeWith called — path={}, status={}, contentType={}", path, getStatusCode(), contentType);

                if (contentType == null || !contentType.isCompatibleWith(MediaType.APPLICATION_JSON)) {
                    return super.writeWith(body);
                }

                return DataBufferUtils.join(Flux.from(body))
                        .defaultIfEmpty(getDelegate().bufferFactory().wrap(new byte[0]))
                        .flatMap(dataBuffer -> {
                    byte[] bytes = new byte[dataBuffer.readableByteCount()];
                    dataBuffer.read(bytes);
                    DataBufferUtils.release(dataBuffer);

                    try {
                        int status = getStatusCode() != null ? getStatusCode().value() : 200;
                        boolean success = status < 400;

                        Long startTime = exchange.getAttribute(START_TIME_ATTR);
                        long elapsed = startTime != null ? System.currentTimeMillis() - startTime : 0;

                        JsonNode original = bytes.length > 0
                                ? objectMapper.readTree(bytes)
                                : objectMapper.createObjectNode();

                        ObjectNode wrapped = objectMapper.createObjectNode();
                        wrapped.put("success", success);
                        wrapped.put("statusCode", status);

                        if (success) {
                            wrapped.put("message", original.path("message").asText("OK"));
                            wrapped.set("data", original.has("data") ? original.get("data") : original);
                        } else {
                            wrapped.put("message", original.path("message").asText("Đã có lỗi xảy ra"));
                            wrapped.putNull("data");
                        }

                        wrapped.put("path", path);
                        wrapped.put("timestamp", Instant.now().toString());
                        wrapped.put("responseTime", elapsed + " ms");

                        byte[] wrappedBytes = objectMapper.writeValueAsBytes(wrapped);

                        getHeaders().remove(HttpHeaders.TRANSFER_ENCODING);
                        getHeaders().setContentLength(wrappedBytes.length);

                        return super.writeWith(
                                Mono.just(getDelegate().bufferFactory().wrap(wrappedBytes))
                        );
                    } catch (Exception e) {
                        log.warn("Response wrap skipped for {}: {}", path, e.getMessage());
                        return super.writeWith(
                                Mono.just(getDelegate().bufferFactory().wrap(bytes))
                        );
                    }
                }).onErrorResume(e -> {
                    log.error("ResponseWrapperFilter.writeWith error for {}: {}", path, e.getMessage(), e);
                    return Mono.empty();
                });
            }

            @Override
            public Mono<Void> writeAndFlushWith(Publisher<? extends Publisher<? extends DataBuffer>> body) {
                // Spring Cloud Gateway sometimes calls writeAndFlushWith instead of writeWith.
                // Flatten the nested publisher so our writeWith override handles it.
                return writeWith(Flux.from(body).flatMapSequential(p -> p));
            }
        };

        return chain.filter(exchange.mutate().response(decorated).build());
    }
}
