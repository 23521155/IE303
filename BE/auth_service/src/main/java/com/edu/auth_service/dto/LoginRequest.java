package com.edu.auth_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequest {
    @Email(message = "Email không đúng định dạng")
    private String email;

    @Size(min = 8, message = "Mật khẩu tối thiểu 8 ký tự")
    private String password;
}
