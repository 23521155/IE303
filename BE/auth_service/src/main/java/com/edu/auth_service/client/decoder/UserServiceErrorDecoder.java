package com.edu.auth_service.client.decoder;

import com.edu.auth_service.exception.DuplicateEmailException;
import feign.Response;
import feign.codec.ErrorDecoder;

public class UserServiceErrorDecoder implements ErrorDecoder {

    private final ErrorDecoder defaultDecoder = new Default();

    @Override
    public Exception decode(String methodKey, Response response) {
        return switch (response.status()) {
            case 409 -> new DuplicateEmailException("Email đã được sử dụng");
            case 404 -> new RuntimeException("Người dùng không tồn tại");
            default -> defaultDecoder.decode(methodKey, response);
        };
    }
}
