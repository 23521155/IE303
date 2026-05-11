package com.edu.auth_service.controller;

import com.edu.auth_service.dto.internal.LoginResult;
import com.edu.auth_service.dto.internal.RefreshResult;
import com.edu.auth_service.dto.request.LoginRequest;
import com.edu.auth_service.dto.request.RegisterRequest;
import com.edu.auth_service.dto.response.ApiResponse;
import com.edu.auth_service.dto.response.LoginResponse;
import com.edu.auth_service.dto.response.RegisterResponse;
import com.edu.auth_service.exception.AuthException;
import com.edu.auth_service.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Arrays;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final Duration ACCESS_TOKEN_TTL = Duration.ofMinutes(15);
    private static final Duration REFRESH_TOKEN_TTL = Duration.ofDays(30);

    @Value("${cookie.secure:false}")
    private boolean cookieSecure;

    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
        RegisterResponse result = authService.register(request);
        return new ApiResponse<>("Đăng ký thành công", result);
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {
        LoginResult result = authService.login(request);

        setAccessTokenCookie(response, result.accessToken());
        setRefreshTokenCookie(response, result.refreshToken());

        return new ApiResponse<>("Đăng nhập thành công", new LoginResponse(result.userId()));
    }

    @PostMapping("/refresh")
    public ApiResponse<Void> refresh(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = extractCookie(request, "refresh_token");
        if (refreshToken == null) {
            throw new AuthException("Thiếu refresh token");
        }

        RefreshResult result = authService.refresh(refreshToken);
        setAccessTokenCookie(response, result.accessToken());
        setRefreshTokenCookie(response, result.refreshToken());

        return new ApiResponse<>("Làm mới token thành công", null);
    }

    @DeleteMapping("/logout")
    public ApiResponse<String> logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = extractCookie(request, "refresh_token");
        if (refreshToken != null) {
            authService.logout(refreshToken);
        }

        clearCookie(response, "access_token");
        clearCookie(response, "refresh_token");

        return new ApiResponse<>("Đăng xuất thành công", "OK");
    }

    private void setAccessTokenCookie(HttpServletResponse response, String token) {
        response.addHeader(HttpHeaders.SET_COOKIE,
                ResponseCookie.from("access_token", token)
                        .httpOnly(true)
                        .secure(cookieSecure)
                        .path("/")
                        .maxAge(ACCESS_TOKEN_TTL)
                        .sameSite(cookieSecure ? "None" : "Lax")
                        .build().toString());
    }

    private void setRefreshTokenCookie(HttpServletResponse response, String token) {
        response.addHeader(HttpHeaders.SET_COOKIE,
                ResponseCookie.from("refresh_token", token)
                        .httpOnly(true)
                        .secure(cookieSecure)
                        .path("/api/auth")
                        .maxAge(REFRESH_TOKEN_TTL)
                        .sameSite(cookieSecure ? "None" : "Lax")
                        .build().toString());
    }

    private void clearCookie(HttpServletResponse response, String name) {
        String path = "refresh_token".equals(name) ? "/api/auth" : "/";
        response.addHeader(HttpHeaders.SET_COOKIE,
                ResponseCookie.from(name, "")
                        .httpOnly(true)
                        .secure(cookieSecure)
                        .path(path)
                        .maxAge(Duration.ZERO)
                        .sameSite(cookieSecure ? "None" : "Lax")
                        .build().toString());
    }

    private String extractCookie(HttpServletRequest request, String name) {
        if (request.getCookies() == null) return null;
        return Arrays.stream(request.getCookies())
                .filter(c -> name.equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }
}
