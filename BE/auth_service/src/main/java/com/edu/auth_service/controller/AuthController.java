package com.edu.auth_service.controller;

import com.edu.auth_service.dto.*;
import com.edu.auth_service.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<RegisterResponse>  register(@Valid @RequestBody RegisterRequest request){

        RegisterResponse result = authService.register(request);

        return new ApiResponse<>(
                200,
                "Đăng ký thành công",
                result
        );
    }

    @PostMapping("login")
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request, HttpServletResponse response)
    {
        LoginResponse result = authService.login(request);

        Cookie cookie = new Cookie("token", result.getToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);

        response.addCookie(cookie);
        return new ApiResponse<>(
                200,
                "Đăng nhập thành công",
                result
        );
    }

    @DeleteMapping("logout")
    public ApiResponse<String> logout(HttpServletResponse response){
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);

        return new ApiResponse<>(
                200,
                "Đăng xuất thành công",
                "OK"
        );
    }

}
