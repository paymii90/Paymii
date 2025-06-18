package com.paymii.backend.repositories;


import com.paymii.backend.entities.Coin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CoinRepository extends JpaRepository<Coin, Integer> {
    // Use only for custom queries, like finding by symbol
    Optional<Coin> findBySymbol(String symbol);
}

