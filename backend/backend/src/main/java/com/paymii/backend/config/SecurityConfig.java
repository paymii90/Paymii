package com.paymii.backend.config;

import com.paymii.backend.security.FirebaseAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final FirebaseAuthenticationFilter firebaseAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        // ✅ Public endpoints
                        .requestMatchers(
                                "/api/public/**",
                                "/api/test/firebase",
                                "/api/coins/**",
                                "/api/transactions/**",
                                "/api/chat/**",
                                "/api/messages/**",
                                "/api/portfolio"
                        ).permitAll()

                        // ✅ Secure the register endpoint
                        .requestMatchers("/api/users/register").authenticated()

                        // ✅ Optionally, all other /api/users/** routes can be permitted or secured
                        .requestMatchers("/api/users/**").permitAll()

                        // ✅ Everything else is also permitted (change if needed)
                        .anyRequest().permitAll()
                )
                .addFilterBefore(firebaseAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable);

        System.out.println("✅ Firebase filter is active");

        return http.build();
    }
}
