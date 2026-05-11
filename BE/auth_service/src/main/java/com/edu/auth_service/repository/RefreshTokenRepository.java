package com.edu.auth_service.repository;

import com.edu.auth_service.entity.Credential;
import com.edu.auth_service.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    @Modifying
    @Query("UPDATE RefreshToken r SET r.revoked = true WHERE r.credential = :credential AND r.revoked = false")
    void revokeAllByCredential(Credential credential);
}
