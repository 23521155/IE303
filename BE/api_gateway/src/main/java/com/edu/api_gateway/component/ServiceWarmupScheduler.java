package com.edu.api_gateway.component;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.List;

@Slf4j
@Component
public class ServiceWarmupScheduler {

    private final WebClient webClient;

    // Endpoint cong khai, khong can auth, co query DB de giu connection am
    private static final List<String> WARMUP_URIS = List.of(
            "http://auth-service/actuator/health",
            "http://user-service/actuator/health",
            "http://exam-service/api/categories",
            "http://material-service/api/materials"
    );

    public ServiceWarmupScheduler(
            @Qualifier("warmupWebClientBuilder") WebClient.Builder builder) {
        this.webClient = builder.build();
    }

    // Chay moi 4 phut, bat dau sau 60 giay khi gateway khoi dong xong
    @Scheduled(fixedDelay = 240_000, initialDelay = 60_000)
    public void warmup() {
        log.debug("Warmup ping: keeping service DB connections alive");
        WARMUP_URIS.forEach(uri ->
                webClient.get()
                        .uri(uri)
                        .retrieve()
                        .bodyToMono(String.class)
                        .timeout(Duration.ofSeconds(10))
                        .onErrorResume(e -> {
                            log.debug("Warmup skipped {}: {}", uri, e.getMessage());
                            return Mono.empty();
                        })
                        .subscribe(ignored -> log.debug("Warmup OK: {}", uri))
        );
    }
}
