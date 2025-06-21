package com.paymii.backend.config;

import com.paymii.backend.security.FirebaseAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final FirebaseAuthenticationFilter firebaseAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/users/register",
                                "/api/users/by-email",
                                "/api/test/firebase",
                                "/api/coins/**"
                        ).permitAll()
                        .requestMatchers("/api/transactions/**").authenticated() // ✅ Require auth here
                        .anyRequest().authenticated()
                )
                .addFilterBefore(
                        firebaseAuthenticationFilter,
                        org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}
