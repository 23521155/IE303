package com.edu.auth_service.repository;

import com.edu.auth_service.entity.Credential;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CredentialRepository extends JpaRepository<Credential, Long> {

}