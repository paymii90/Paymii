package com.paymii.backend.controllers.transaction;

import com.google.firebase.auth.FirebaseToken;
import com.paymii.backend.dtos.transaction.*;
import com.paymii.backend.entities.Portfolio;
import com.paymii.backend.entities.Transaction;
import com.paymii.backend.entities.User;
import com.paymii.backend.mappers.TransactionMapper;
import com.paymii.backend.repositories.PortfolioRepository;
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

import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

<<<<<<< HEAD
    @PostMapping("/buy")
    public Transaction buy(@RequestBody BuyRequest req) {

        return transactionService.buy(req);
=======
    @Autowired
    private TransactionMapper transactionMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private PortfolioRepository  portfolioRepository;

    private static final Logger logger = LoggerFactory.getLogger(TransactionController.class);

    @PostMapping("/buy")
    public ResponseEntity<?> buy(@RequestBody BuyRequest req) {
        try {
            FirebaseToken token = (FirebaseToken) SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal();

            String firebaseUid = token.getUid();

            User user = userRepository.findByFirebaseUid(firebaseUid)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // ✅ Check user balance before buying
            if (user.getBalance().compareTo(req.amount) < 0) {
                return ResponseEntity.badRequest().body("Insufficient balance");
            }

            // ✅ Deduct balance and save user
            user.setBalance(user.getBalance().subtract(req.amount));
            userRepository.save(user);

            // ✅ Save the transaction
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

            // ✅ Update or create portfolio entry
            Optional<Portfolio> portfolioOpt = portfolioRepository.findByUserAndCoinId(user, req.coinId);

            Portfolio portfolio = portfolioOpt.orElseGet(() -> {
                Portfolio newPortfolio = new Portfolio();
                newPortfolio.setUser(user);
                newPortfolio.setCoinId(req.coinId);
                newPortfolio.setAmount(BigDecimal.ZERO);
                return newPortfolio;
            });

            if (portfolio.getAmount() == null) {
                portfolio.setAmount(BigDecimal.ZERO);
            }

            portfolio.setAmount(portfolio.getAmount().add(req.getCoinQuantity()));
            portfolioRepository.save(portfolio);

            // ✅ Optional: return updated balance with the transaction
            Map<String, Object> response = new HashMap<>();
            response.put("transaction", savedTx);
            response.put("updatedBalance", user.getBalance());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error in /buy endpoint", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Buy failed: " + e.getMessage());
        }
>>>>>>> 460128f3b94239e4d5254f32650f7779896ef216
    }

    @PostMapping("/sell")
    public Transaction sell(@RequestBody SellRequest req) {
<<<<<<< HEAD

=======
>>>>>>> 460128f3b94239e4d5254f32650f7779896ef216
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
<<<<<<< HEAD
    public List<Transaction> history(@PathVariable Long userId){

=======
    public List<Transaction> history(@PathVariable Long userId) {
>>>>>>> 460128f3b94239e4d5254f32650f7779896ef216
        return transactionService.getHistory(userId);
    }
}
