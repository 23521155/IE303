package com.edu.auth_service.service;

import com.edu.auth_service.client.UserServiceClient;
import com.edu.auth_service.dto.*;
import com.edu.auth_service.entity.Credential;
import com.edu.auth_service.repository.CredentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final CredentialRepository credentialRepository;
    private final UserServiceClient userServiceClient;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public RegisterResponse register(RegisterRequest request){

        UserResponse userResponse = userServiceClient.createUser(
                new CreateUserRequest(request.getName(), request.getPhoneNumber(), request.getStatus(), request.getEmail())
        );

        if(!userResponse.isSuccess()) throw new RuntimeException(userResponse.getMessage());

        Long userId = userResponse.getData().getId();

        Credential credential = credentialRepository.save(
                 Credential.builder().userId(userId)
                         .email(request.getEmail())
                         .password(passwordEncoder.encode(request.getPassword()))
                         .build()
        );


        return new RegisterResponse(
                credential.getId()
        );
    }

    public LoginResponse login(LoginRequest request){

        Credential credential = credentialRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Không có tài khoản"));

        if (!passwordEncoder.matches(request.getPassword(), credential.getPassword())) {
            throw new RuntimeException("Sai mật khẩu");
        }

        Long userId = credential.getUserId();

        UserResponse userResponse = userServiceClient.getUser(userId);
        if(userResponse.getStatusCode() != 200) {
            throw new RuntimeException("Không có người dùng");
        }

        String token = jwtService.generateToken(userId);

        return new LoginResponse(token);
    }
}
