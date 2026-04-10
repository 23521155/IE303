package com.edu.user_service.controller;

import com.edu.user_service.dto.CreateUserRequest;
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
    public User getUserById(@PathVariable Long id)
    {
        return userService.getUserById(id);
    }

    @GetMapping("/me")
    public User getMe(Authentication authentication){
        log.info("hi");
        String userId = authentication.getName();
        log.info(userId);
        Long id = Long.parseLong(userId);
        User user = userService.getUserById(id);
        return user;

    }

}