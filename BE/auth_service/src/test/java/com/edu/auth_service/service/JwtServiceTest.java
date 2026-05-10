package com.edu.auth_service.service;

import com.edu.auth_service.security.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import javax.crypto.SecretKey;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("JwtService — unit tests")
class JwtServiceTest {

    private static final String TEST_SECRET     = "FizzCoConCaFizzCoConCaFizzCoConCa";
    private static final long   TEST_EXPIRATION = 86_400_000L;

    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "secret",     TEST_SECRET);
        ReflectionTestUtils.setField(jwtService, "expiration", TEST_EXPIRATION);
        jwtService.init();
    }

    @Test
    @DisplayName("generateToken: trả về string không rỗng")
    void generateToken_traVeTokenKhongRong() {
        String token = jwtService.generateToken(1L);
        assertThat(token).isNotNull().isNotBlank();
    }

    @Test
    @DisplayName("generateToken: subject của token chứa đúng userId")
    void generateToken_subjectLaUserId() {
        String token = jwtService.generateToken(42L);
        Claims claims = parseToken(token);
        assertThat(claims.getSubject()).isEqualTo("42");
    }

    @Test
    @DisplayName("generateToken: token chưa hết hạn ngay sau khi tạo")
    void generateToken_tokenChuaHetHan() {
        String token = jwtService.generateToken(1L);
        Claims claims = parseToken(token);
        assertThat(claims.getExpiration()).isAfter(new Date());
    }

    @Test
    @DisplayName("generateToken: thời gian hết hạn xấp xỉ 24h từ lúc tạo")
    void generateToken_thoiGianHetHanDung24h() {
        long truocKhiTao = System.currentTimeMillis();
        String token = jwtService.generateToken(1L);
        long sauKhiTao  = System.currentTimeMillis();

        Claims claims = parseToken(token);
        long expireMs = claims.getExpiration().getTime();

        assertThat(expireMs).isBetween(
                truocKhiTao + TEST_EXPIRATION - 1_000,
                sauKhiTao   + TEST_EXPIRATION + 1_000
        );
    }

    private Claims parseToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(TEST_SECRET.getBytes());
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
