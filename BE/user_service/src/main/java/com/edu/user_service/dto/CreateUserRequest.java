package com.edu.user_service.dto;

import lombok.Data;

@Data
public class CreateUserRequest {

    private String name;
    private String email;
    private String password;
}