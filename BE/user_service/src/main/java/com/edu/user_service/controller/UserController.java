package com.edu.user_service.controller;

import com.edu.user_service.dto.CreateUserRequest;
import com.edu.user_service.dto.UserProfileDto;
import com.edu.user_service.entity.User;
import com.edu.user_service.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public User createUser(@Valid @RequestBody CreateUserRequest request) {
        return userService.createUser(request);
    }

    @GetMapping("/{id}")
    public UserProfileDto getUserById(@PathVariable Long id) {
        User u = userService.getUserById(id);
        return UserProfileDto.builder()
                .id(u.getId())
                .name(u.getName())
                .currentStatus(u.getCurrentStatus())
                .createdAt(u.getCreatedAt())
                .build();
    }

    @GetMapping("/me")
    public UserProfileDto getMe(Authentication authentication) {
        String userId = authentication.getName();
        Long id = Long.parseLong(userId);
        User u = userService.getUserById(id);
        return UserProfileDto.builder()
                .id(u.getId())
                .name(u.getName())
                .phoneNumber(u.getPhoneNumber())
                .currentStatus(u.getCurrentStatus())
                .email(u.getEmail())
                .createdAt(u.getCreatedAt())
                .build();
    }

}