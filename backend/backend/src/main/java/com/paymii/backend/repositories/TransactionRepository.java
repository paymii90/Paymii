package com.paymii.backend.repositories;

import com.paymii.backend.entities.Transaction;
import com.paymii.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
    Optional<Transaction> findTopByUserAndCoinIdOrderByTimestampDesc(User user, String coinId);


}
