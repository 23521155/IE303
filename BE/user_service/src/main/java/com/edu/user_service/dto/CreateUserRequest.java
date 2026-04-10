package com.edu.user_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateUserRequest {
    @Size(min = 3, max = 20, message = "Tên dài tối thiểu 3 ký tự và tối đa 20 ký tự")
    @NotBlank(message = "Tên không được bỏ trống")
    private String name;


    private String phoneNumber;

    private String current;

}