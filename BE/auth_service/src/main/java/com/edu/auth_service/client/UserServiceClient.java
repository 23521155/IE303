package com.edu.auth_service.client;

import com.edu.auth_service.dto.CreateUserRequest;
import com.edu.auth_service.dto.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-service", url = "http://localhost:8081")
public interface UserServiceClient {
    @PostMapping("/api/users")
    UserResponse createUser(@RequestBody CreateUserRequest request);

    @GetMapping("/api/users/{id}")
    UserResponse getUser(@PathVariable("id") Long id);
}