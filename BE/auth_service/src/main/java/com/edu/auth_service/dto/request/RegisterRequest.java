package com.edu.auth_service.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Tên không được bỏ trống")
    @Size(min = 3, max = 20, message = "Tên dài tối thiểu 3 ký tự và tối đa 20 ký tự")
    private String name;

    @NotBlank(message = "Email không được bỏ trống")
    @Email(message = "Email không đúng định dạng")
    private String email;

    @NotBlank(message = "Số điện thoại không được trống")
    private String phoneNumber;

    @NotBlank(message = "Không được bỏ trống tình trạng hiện tại")
    private String status;

    @NotBlank(message = "Mật khẩu không được bỏ trống")
    @Size(min = 8, message = "Mật khẩu tối thiểu 8 ký tự")
    private String password;
}
