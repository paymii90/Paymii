package com.paymii.backend.repositories;

import com.paymii.backend.entities.Wallet;
import com.paymii.backend.entities.Withdrawal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WithdrawalRepository extends JpaRepository<Withdrawal, Long> {
    List<Withdrawal> findByUserId(Long userId);
}
