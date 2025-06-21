package com.paymii.backend.config;

import com.paymii.backend.security.FirebaseAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
<<<<<<< HEAD
public class SecurityConfig {
=======
@RequiredArgsConstructor
public class SecurityConfig {

    private final FirebaseAuthenticationFilter firebaseAuthenticationFilter;

>>>>>>> 460128f3b94239e4d5254f32650f7779896ef216
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
<<<<<<< HEAD
                                "/api/public/**",
                                "/api/test/firebase",
                                "/api/coins/**",
                                "/api/transaction/**",
                                "/api/users/**" )
                        .permitAll()  // Use requestMatchers
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new FirebaseAuthenticationFilter(),
=======
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
>>>>>>> 460128f3b94239e4d5254f32650f7779896ef216
                        org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}
