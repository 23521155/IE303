package com.edu.user_service.service;

import com.edu.user_service.dto.CreateUserRequest;
import com.edu.user_service.entity.User;
import com.edu.user_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User createUser(CreateUserRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Người dùng đã tồn tại");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        return userRepository.save(user);

    }
}