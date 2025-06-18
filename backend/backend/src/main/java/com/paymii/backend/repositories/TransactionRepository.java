package com.paymii.backend.repositories;

import com.paymii.backend.entities.Transaction;
import com.paymii.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
}
