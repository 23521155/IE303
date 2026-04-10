package com.edu.user_service.repository;

import com.edu.user_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByName(String username);
    boolean existsById(Long id);
}