package com.paymii.backend.repositories;

import com.paymii.backend.entities.Coin;
import com.paymii.backend.entities.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Optional<Wallet> findByUserIdAndCurrency(Long user_id, Coin currency);
    List<Wallet> findByUserId(Long userId);
}
