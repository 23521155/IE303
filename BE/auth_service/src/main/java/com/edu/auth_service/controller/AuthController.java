package com.edu.auth_service.controller;

import com.edu.auth_service.dto.ApiResponse;
import com.edu.auth_service.dto.RegisterRequest;
import com.edu.auth_service.dto.RegisterResponse;
import com.edu.auth_service.service.AuthService;
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
}
