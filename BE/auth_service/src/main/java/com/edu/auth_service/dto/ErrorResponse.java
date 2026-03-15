package com.edu.auth_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class ErrorResponse {

    private int statusCode;
    private String message;


}