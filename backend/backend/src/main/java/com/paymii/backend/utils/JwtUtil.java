package com.paymii.backend.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretBase64;

    private SecretKey secretKey;

    private static final long EXPIRATION_MS = 86_400_000; // 1 day

    @PostConstruct
    public void init() {
        byte[] decodedKey = Base64.getDecoder().decode(secretBase64);
        this.secretKey = new SecretKeySpec(decodedKey, SignatureAlgorithm.HS512.getJcaName());
    }

    public String generateToken(Long userId, String email) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim("email", email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }
}
