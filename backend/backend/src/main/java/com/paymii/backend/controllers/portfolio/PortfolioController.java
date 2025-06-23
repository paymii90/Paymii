package com.paymii.backend.controllers.portfolio;

import com.google.firebase.auth.FirebaseToken;
import com.paymii.backend.entities.Portfolio;
import com.paymii.backend.entities.User;
import com.paymii.backend.repositories.PortfolioRepository;
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

            List<Portfolio> portfolio = portfolioRepository.findAllByUser(user);
            return ResponseEntity.ok(portfolio);

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Unable to fetch portfolio: " + e.getMessage());
        }
    }
}
