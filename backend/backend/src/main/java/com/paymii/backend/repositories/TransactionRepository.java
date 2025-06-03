package com.paymii.backend.repositories;

import com.paymii.backend.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySenderIdOrReceiverId(Long senderId, Long receiverId);
    //List<Transaction> findByUserId(Long userId); // optional if needed
}
