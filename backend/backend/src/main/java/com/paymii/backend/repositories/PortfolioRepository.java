package com.paymii.backend.repositories;

import com.paymii.backend.entities.Portfolio;
import com.paymii.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    Optional<Portfolio> findByUserAndCoinId(User user, String coinId);
    List<Portfolio> findAllByUser(User user);
}
 