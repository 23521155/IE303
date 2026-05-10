package com.edu.auth_service.service.impl;

import com.edu.auth_service.client.UserServiceClient;
import com.edu.auth_service.client.dto.CreateUserRequest;
import com.edu.auth_service.client.dto.UserResponse;
import com.edu.auth_service.dto.internal.LoginResult;
import com.edu.auth_service.dto.request.LoginRequest;
import com.edu.auth_service.dto.request.RegisterRequest;
import com.edu.auth_service.dto.response.RegisterResponse;
import com.edu.auth_service.entity.Credential;
import com.edu.auth_service.exception.AuthException;
import com.edu.auth_service.exception.DuplicateEmailException;
import com.edu.auth_service.repository.CredentialRepository;
import com.edu.auth_service.security.JwtService;
import com.edu.auth_service.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final CredentialRepository credentialRepository;
    private final UserServiceClient userServiceClient;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public RegisterResponse register(RegisterRequest request) {
        if (credentialRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new DuplicateEmailException("Email đã được sử dụng");
        }

        UserResponse userResponse = userServiceClient.createUser(
                new CreateUserRequest(request.getName(), request.getPhoneNumber(), request.getStatus(), request.getEmail())
        );

        if (!userResponse.isSuccess()) throw new RuntimeException(userResponse.getMessage());

        Long userId = userResponse.getData().getId();

        Credential credential = credentialRepository.save(
                Credential.builder()
                        .userId(userId)
                        .email(request.getEmail())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .build()
        );

        return new RegisterResponse(credential.getId());
    }

    @Override
    public LoginResult login(LoginRequest request) {
        Credential credential = credentialRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthException("Email không tồn tại"));

        if (!passwordEncoder.matches(request.getPassword(), credential.getPassword())) {
            throw new AuthException("Sai mật khẩu");
        }

        Long userId = credential.getUserId();
        String token = jwtService.generateToken(userId);

        return new LoginResult(token, userId);
    }
}
