package com.edu.auth_service.service;

import com.edu.auth_service.dto.RegisterRequest;
import com.edu.auth_service.dto.RegisterResponse;
import com.edu.auth_service.entity.Credential;
import com.edu.auth_service.repository.CredentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final CredentialRepository credentialRepository;


    public RegisterResponse register(RegisterRequest request){
        Credential credential = credentialRepository.save(
                new Credential(request.getEmail(), request.getPassword())
        );


        return new RegisterResponse(
                credential.getId()
        );
    }
}
