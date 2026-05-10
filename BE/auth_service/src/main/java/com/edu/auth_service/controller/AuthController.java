package com.edu.auth_service.controller;

import com.edu.auth_service.dto.internal.LoginResult;
import com.edu.auth_service.dto.request.LoginRequest;
import com.edu.auth_service.dto.request.RegisterRequest;
import com.edu.auth_service.dto.response.ApiResponse;
import com.edu.auth_service.dto.response.LoginResponse;
import com.edu.auth_service.dto.response.RegisterResponse;
import com.edu.auth_service.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
        RegisterResponse result = authService.register(request);
        return new ApiResponse<>(200, "Đăng ký thành công", result);
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {
        LoginResult result = authService.login(request);

        ResponseCookie cookie = ResponseCookie.from("token", result.token())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofDays(1))
                .sameSite("Lax")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return new ApiResponse<>(200, "Đăng nhập thành công", new LoginResponse(result.userId()));
    }

    @DeleteMapping("/logout")
    public ApiResponse<String> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ZERO)
                .sameSite("Lax")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return new ApiResponse<>(200, "Đăng xuất thành công", "OK");
    }
}
