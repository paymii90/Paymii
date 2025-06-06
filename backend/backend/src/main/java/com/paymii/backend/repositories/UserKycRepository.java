package com.paymii.backend.repositories;


import com.paymii.backend.entities.UserKyc;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserKycRepository extends JpaRepository<UserKyc, Long> {
    Optional<UserKyc> findByUserId(Long userId);
}
