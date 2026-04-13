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

        if (userRepository.existsByName(request.getName())) {
            throw new RuntimeException("Người dùng đã tồn tại");
        }

        User user = new User();
        user.setName(request.getName());
        System.out.println(request.getCurrent());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setCurrentStatus(request.getCurrent());
        return userRepository.save(user);

    }

    public User getUserById(Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));
    }


}