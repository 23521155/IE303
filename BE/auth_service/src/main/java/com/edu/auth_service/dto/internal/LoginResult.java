package com.edu.auth_service.dto.internal;

public record LoginResult(String accessToken, String refreshToken, Long userId) {}
