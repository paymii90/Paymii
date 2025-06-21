package com.paymii.backend.services;

import com.paymii.backend.dtos.transaction.*;
import com.paymii.backend.entities.*;
import com.paymii.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    public Transaction buy(BuyRequest req) {
        User user = userRepository.findById(req.userId).orElseThrow();
        Transaction tx = new Transaction();
        tx.setUser(user);
        tx.setCoinId(req.coinId);
        tx.setCoinName(req.coinName);
        tx.setCoinSymbol(req.coinSymbol);
        tx.setCoinImage(req.coinImage);
        tx.setCoinPrice(req.coinPrice);
        tx.setAmount(req.amount.abs());
        tx.setDetails("Payment Method: " + req.paymentMethod);
        tx.setCoinQuantity(req.getCoinQuantity());
        tx.setType("BUY");
        tx.setTimestamp(Instant.now());
        return transactionRepository.save(tx);
    }


    public Transaction sell(SellRequest req) {
        User user = userRepository.findById(req.userId).orElseThrow();
        Transaction tx = new Transaction();
        tx.setUser(user);
        tx.setCoinId(req.coinId);
        tx.setCoinName(req.coinName);
        tx.setCoinSymbol(req.coinSymbol);
        tx.setCoinImage(req.coinImage);
        tx.setCoinPrice(req.coinPrice);
        tx.setAmount(req.amount.negate());
        tx.setDetails("Sell");
        tx.setType("SELL");
        tx.setTimestamp(Instant.from(LocalDateTime.now()));
        return transactionRepository.save(tx);
    }

    public Transaction send(SendRequest req) {
        User user = userRepository.findById(req.userId).orElseThrow();
        Transaction tx = new Transaction();
        tx.setUser(user);
        tx.setCoinId(req.coinId);
        tx.setCoinName(req.coinName);
        tx.setCoinSymbol(req.coinSymbol);
        tx.setCoinImage(req.coinImage);
        tx.setCoinPrice(req.coinPrice);
        tx.setAmount(req.amount.negate());
        tx.setDetails("To: " + req.recipient);
        tx.setType("SEND");
        tx.setTimestamp(Instant.from(LocalDateTime.now()));
        return transactionRepository.save(tx);
    }

    public Transaction withdraw(WithdrawRequest req) {
        User user = userRepository.findById(req.userId).orElseThrow();
        Transaction tx = new Transaction();
        tx.setUser(user);
        tx.setCoinId(req.coinId);
        tx.setCoinName(req.coinName);
        tx.setCoinSymbol(req.coinSymbol);
        tx.setCoinImage(req.coinImage);
        tx.setCoinPrice(req.coinPrice);
        tx.setAmount(req.amount.negate());
        tx.setDetails("To Account: " + req.toAccount);
        tx.setType("WITHDRAW");
        tx.setTimestamp(Instant.from(LocalDateTime.now()));
        return transactionRepository.save(tx);
    }

    public Transaction deposit(DepositRequest req) {
        User user = userRepository.findById(req.userId).orElseThrow();
        Transaction tx = new Transaction();
        tx.setUser(user);
        tx.setCoinId(req.coinId);
        tx.setCoinName(req.coinName);
        tx.setCoinSymbol(req.coinSymbol);
        tx.setCoinImage(req.coinImage);
        tx.setCoinPrice(req.coinPrice);
        tx.setAmount(req.amount.abs());
        tx.setDetails("Source: " + req.source);
        tx.setType("DEPOSIT");
        tx.setTimestamp(Instant.from(LocalDateTime.now()));
        return transactionRepository.save(tx);
    }

    public List<Transaction> convert(ConvertRequest req) {
        User user = userRepository.findById(req.userId).orElseThrow();
        Transaction txFrom = new Transaction();
        txFrom.setUser(user);
        txFrom.setCoinId(req.fromCoinId);
        txFrom.setCoinName(req.fromCoinName);
        txFrom.setCoinSymbol(req.fromCoinSymbol);
        txFrom.setCoinImage(req.fromCoinImage);
        txFrom.setCoinPrice(req.fromCoinPrice);
        txFrom.setAmount(req.amount.negate());
        txFrom.setDetails("Convert from " + req.fromCoinSymbol);
        txFrom.setType("CONVERT");
        txFrom.setTimestamp(Instant.from(LocalDateTime.now()));

        Transaction txTo = new Transaction();
        txTo.setUser(user);
        txTo.setCoinId(req.toCoinId);
        txTo.setCoinName(req.toCoinName);
        txTo.setCoinSymbol(req.toCoinSymbol);
        txTo.setCoinImage(req.toCoinImage);
        txTo.setCoinPrice(req.toCoinPrice);
        txTo.setAmount(req.amount.abs()); // Use real exchange rate in prod
        txTo.setDetails("Convert to " + req.toCoinSymbol);
        txTo.setType("CONVERT");
        txTo.setTimestamp(Instant.from(LocalDateTime.now()));

        transactionRepository.save(txFrom);
        transactionRepository.save(txTo);

        return List.of(txFrom, txTo);
    }

    public List<Transaction> getHistory(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return transactionRepository.findByUser(user);
    }
}
