package com.paymii.backend.controllers.portfolio;

import com.google.firebase.auth.FirebaseToken;
import com.paymii.backend.dtos.portfolio.PortfolioResponseDTO;
import com.paymii.backend.entities.Portfolio;
import com.paymii.backend.entities.Transaction;
import com.paymii.backend.entities.User;
import com.paymii.backend.repositories.PortfolioRepository;
import com.paymii.backend.repositories.TransactionRepository;
import com.paymii.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@RequiredArgsConstructor
public class PortfolioController {

    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;
    private final TransactionRepository transactionRepository;

    @GetMapping
    public ResponseEntity<?> getUserPortfolio() {
        try {
            FirebaseToken token = (FirebaseToken) SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal();

            String firebaseUid = token.getUid();

            User user = userRepository.findByFirebaseUid(firebaseUid)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<Portfolio> portfolioList = portfolioRepository.findAllByUser(user);

            List<PortfolioResponseDTO> response = portfolioList.stream().map(p -> {
                // Get the latest transaction for this coin
                Transaction latest = transactionRepository
                        .findTopByUserAndCoinIdOrderByTimestampDesc(user, p.getCoinId())
                        .orElse(null);

                return new PortfolioResponseDTO(
                        p.getCoinId(),
                        latest != null ? latest.getCoinName() : "",
                        latest != null ? latest.getCoinSymbol() : "",
                        latest != null ? latest.getCoinImage() : "",
                        p.getAmount().doubleValue(),
                        latest != null
                                ? latest.getCoinPrice().multiply(p.getAmount()).doubleValue()
                                : 0.0
                );
            }).toList();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Unable to fetch portfolio: " + e.getMessage());
        }
    }
}
