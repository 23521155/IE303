package com.edu.auth_service.service;

import com.edu.auth_service.dto.internal.LoginResult;
import com.edu.auth_service.dto.internal.RefreshResult;
import com.edu.auth_service.dto.request.LoginRequest;
import com.edu.auth_service.dto.request.RegisterRequest;
import com.edu.auth_service.dto.response.RegisterResponse;

public interface AuthService {
    RegisterResponse register(RegisterRequest request);
    LoginResult login(LoginRequest request);
    RefreshResult refresh(String refreshToken);
    void logout(String refreshToken);
}
