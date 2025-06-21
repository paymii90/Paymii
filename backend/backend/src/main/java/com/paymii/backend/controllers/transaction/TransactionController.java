package com.paymii.backend.controllers.transaction;

import com.google.firebase.auth.FirebaseToken;
import com.paymii.backend.dtos.transaction.*;
import com.paymii.backend.entities.Transaction;
import com.paymii.backend.entities.User;
import com.paymii.backend.mappers.TransactionMapper;
import com.paymii.backend.repositories.TransactionRepository;
import com.paymii.backend.repositories.UserRepository;
import com.paymii.backend.services.TransactionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private TransactionMapper transactionMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    private static final Logger logger = LoggerFactory.getLogger(TransactionController.class);

    @PostMapping("/buy")
    public ResponseEntity<Transaction> buy(@RequestBody BuyRequest req) {
        try {
            FirebaseToken token = (FirebaseToken) SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal();

            String firebaseUid = token.getUid();

            User user = userRepository.findByFirebaseUid(firebaseUid)
                    .orElseThrow(() -> new RuntimeException("User not found"));

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

            Transaction savedTx = transactionRepository.save(tx);

            return ResponseEntity.ok(savedTx);
        } catch (Exception e) {
            logger.error("Error in /buy endpoint", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/sell")
    public Transaction sell(@RequestBody SellRequest req) {
        return transactionService.sell(req);
    }

    @PostMapping("/send")
    public Transaction send(@RequestBody SendRequest req) {
        return transactionService.send(req);
    }

    @PostMapping("/withdraw")
    public Transaction withdraw(@RequestBody WithdrawRequest req) {
        return transactionService.withdraw(req);
    }

    @PostMapping("/deposit")
    public Transaction deposit(@RequestBody DepositRequest req) {
        return transactionService.deposit(req);
    }

    @PostMapping("/convert")
    public List<Transaction> convert(@RequestBody ConvertRequest req) {
        return transactionService.convert(req);
    }

    @GetMapping("/history/{userId}")
    public List<Transaction> history(@PathVariable Long userId) {
        return transactionService.getHistory(userId);
    }
}
