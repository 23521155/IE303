package com.edu.auth_service.service.impl;

import com.edu.auth_service.client.UserServiceClient;
import com.edu.auth_service.client.dto.CreateUserRequest;
import com.edu.auth_service.client.dto.UserResponse;
import com.edu.auth_service.dto.internal.LoginResult;
import com.edu.auth_service.dto.internal.RefreshResult;
import com.edu.auth_service.dto.request.LoginRequest;
import com.edu.auth_service.dto.request.RegisterRequest;
import com.edu.auth_service.dto.response.RegisterResponse;
import com.edu.auth_service.entity.Credential;
import com.edu.auth_service.entity.RefreshToken;
import com.edu.auth_service.exception.AuthException;
import com.edu.auth_service.exception.DuplicateEmailException;
import com.edu.auth_service.repository.CredentialRepository;
import com.edu.auth_service.repository.RefreshTokenRepository;
import com.edu.auth_service.security.JwtService;
import com.edu.auth_service.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final CredentialRepository credentialRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserServiceClient userServiceClient;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Value("${jwt.refresh-expiration}")
    private long refreshExpiration;

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
    @Transactional
    public LoginResult login(LoginRequest request) {
        Credential credential = credentialRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthException("Email không tồn tại"));

        if (!passwordEncoder.matches(request.getPassword(), credential.getPassword())) {
            throw new AuthException("Sai mật khẩu");
        }

        String accessToken = jwtService.generateToken(credential.getUserId());
        String refreshToken = issueRefreshToken(credential);

        return new LoginResult(accessToken, refreshToken, credential.getUserId());
    }

    @Override
    @Transactional
    public RefreshResult refresh(String refreshTokenValue) {
        RefreshToken stored = refreshTokenRepository.findByToken(refreshTokenValue)
                .orElseThrow(() -> new AuthException("Refresh token không hợp lệ"));

        if (stored.isRevoked()) {
            throw new AuthException("Refresh token đã bị thu hồi");
        }
        if (stored.getExpiresAt().isBefore(Instant.now())) {
            throw new AuthException("Refresh token đã hết hạn");
        }

        // Rotate: revoke old token and issue new pair
        stored.setRevoked(true);
        refreshTokenRepository.save(stored);

        Credential credential = stored.getCredential();
        String newAccessToken = jwtService.generateToken(credential.getUserId());
        String newRefreshToken = issueRefreshToken(credential);

        return new RefreshResult(newAccessToken, newRefreshToken);
    }

    @Override
    @Transactional
    public void logout(String refreshTokenValue) {
        refreshTokenRepository.findByToken(refreshTokenValue).ifPresent(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });
    }

    private String issueRefreshToken(Credential credential) {
        String tokenValue = UUID.randomUUID().toString();
        refreshTokenRepository.save(
                RefreshToken.builder()
                        .token(tokenValue)
                        .credential(credential)
                        .expiresAt(Instant.now().plusMillis(refreshExpiration))
                        .revoked(false)
                        .createdAt(Instant.now())
                        .build()
        );
        return tokenValue;
    }
}
