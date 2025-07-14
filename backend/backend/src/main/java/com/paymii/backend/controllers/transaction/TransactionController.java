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
import java.math.RoundingMode;
import java.time.Instant;
import java.util.*;
@CrossOrigin(origins = "*")
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

    @Autowired
    private PortfolioRepository portfolioRepository;

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
    }


    @PostMapping("/sell")
    public ResponseEntity<?> sell(@RequestBody SellRequest req) {
        try {
            FirebaseToken token = (FirebaseToken) SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal();

            String firebaseUid = token.getUid();

            User user = userRepository.findByFirebaseUid(firebaseUid)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Portfolio portfolio = portfolioRepository.findByUserAndCoinId(user, req.getCoinId())
                    .orElseThrow(() -> new RuntimeException("Coin not found in portfolio"));

            // 🌐 LOGGING: Show raw and scaled values
            logger.debug("📥 Raw sell quantity: {}", req.getCoinQuantity());
            logger.debug("💼 Raw portfolio amount: {}", portfolio.getAmount());

            // ✅ Use scale for safe comparison (set 8 decimal places)
            BigDecimal quantityToSell = req.getCoinQuantity().setScale(8, RoundingMode.HALF_UP);
            BigDecimal portfolioAmount = Optional.ofNullable(portfolio.getAmount())
                    .orElse(BigDecimal.ZERO)
                    .setScale(8, RoundingMode.HALF_UP);

            logger.debug("🎯 Comparing: {} (portfolio) vs {} (to sell)", portfolioAmount, quantityToSell);

            if (portfolioAmount.compareTo(quantityToSell) < 0) {
                return ResponseEntity.badRequest().body("Insufficient coin quantity");
            }

            // ✅ Credit GHS balance
            user.setBalance(user.getBalance().add(req.getAmount()));
            userRepository.save(user);

            // ✅ Save transaction
            Transaction tx = new Transaction();
            tx.setUser(user);
            tx.setCoinId(req.getCoinId());
            tx.setCoinName(req.getCoinName());
            tx.setCoinSymbol(req.getCoinSymbol());
            tx.setCoinImage(req.getCoinImage());
            tx.setCoinPrice(req.getCoinPrice());
            tx.setAmount(req.getAmount().abs());
            tx.setCoinQuantity(quantityToSell);
            tx.setDetails("Payment Method: " + req.getPaymentMethod());
            tx.setType("SELL");
            tx.setTimestamp(Instant.now());

            Transaction savedTx = transactionRepository.save(tx);

            // ✅ Update portfolio
            BigDecimal updatedAmount = portfolioAmount.subtract(quantityToSell);
            if (updatedAmount.compareTo(new BigDecimal("0.00000001")) < 0) {
                portfolioRepository.delete(portfolio);
                logger.debug("🧹 Portfolio entry deleted (balance ≈ 0)");
            } else {
                portfolio.setAmount(updatedAmount);
                portfolioRepository.save(portfolio);
                logger.debug("✅ Portfolio updated to: {}", updatedAmount);
            }

            // ✅ Return
            Map<String, Object> response = new HashMap<>();
            response.put("transaction", savedTx);
            response.put("updatedBalance", user.getBalance());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("❌ Error in /sell endpoint", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Sell failed: " + e.getMessage());
        }
    }



    @PostMapping("/send")
    public ResponseEntity<?> send(@RequestBody SendRequest req) {
        try {
            FirebaseToken token = (FirebaseToken) SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal();

            String firebaseUid = token.getUid();
            User user = userRepository.findByFirebaseUid(firebaseUid)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Portfolio portfolio = portfolioRepository.findByUserAndCoinId(user, req.getCoinId())
                    .orElseThrow(() -> new RuntimeException("Coin not found in portfolio"));

            BigDecimal fee = new BigDecimal("0.000"); // Fixed fee for simplicity
            BigDecimal totalAmount = req.getCoinQuantity().add(fee).setScale(8, RoundingMode.HALF_UP);
            BigDecimal portfolioAmount = portfolio.getAmount().setScale(8, RoundingMode.HALF_UP);

            if (portfolioAmount.compareTo(totalAmount) < 0) {
                return ResponseEntity.badRequest().body("Insufficient coin balance including fees");
            }

            // Simulate broadcast (you may integrate real blockchain logic here)
            String transactionNote = "Send to: " + req.getRecipientAddress();
            if (req.getNote() != null && !req.getNote().isBlank()) {
                transactionNote += " | Note: " + req.getNote();
            }

            // Create transaction
            Transaction tx = new Transaction();
            tx.setUser(user);
            tx.setCoinId(req.getCoinId());
            tx.setCoinName(req.getCoinName());
            tx.setCoinSymbol(req.getCoinSymbol());
            tx.setCoinImage(req.getCoinImage());
            tx.setCoinPrice(req.getCoinPrice());
            tx.setAmount(req.getAmount());
            tx.setCoinQuantity(req.getCoinQuantity());
            tx.setType("SEND");
            tx.setTimestamp(Instant.now());
            tx.setDetails(transactionNote + " | Fee: " + fee.toPlainString() + " " + req.getCoinSymbol());

            Transaction savedTx = transactionRepository.save(tx);

            // Update portfolio
            BigDecimal updatedAmount = portfolioAmount.subtract(totalAmount);
            if (updatedAmount.compareTo(new BigDecimal("0.00000001")) < 0) {
                portfolioRepository.delete(portfolio);
            } else {
                portfolio.setAmount(updatedAmount);
                portfolioRepository.save(portfolio);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("transaction", savedTx);
            response.put("updatedCoinBalance", updatedAmount);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("❌ Error in /send endpoint", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Send failed: " + e.getMessage());
        }
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
