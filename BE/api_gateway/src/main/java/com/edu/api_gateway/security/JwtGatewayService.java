package com.edu.api_gateway.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;

@Service
public class JwtGatewayService {

    private final Key signingKey;

    public JwtGatewayService(@Value("${jwt.secret}") String secret) {
        this.signingKey = Keys.hmacShaKeyFor(secret.getBytes());
    }

    /**
     * Returns userId (JWT subject) if token signature and expiry are valid, null otherwise.
     */
    public String extractUserIdIfValid(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }
}
