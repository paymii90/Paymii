package com.paymii.backend.repositories;

import com.paymii.backend.entities.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(@NotNull @Email String email);
    Optional<Object> findByEmail(@NotNull @Email String email);
}
