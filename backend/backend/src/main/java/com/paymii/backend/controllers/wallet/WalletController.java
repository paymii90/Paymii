package com.paymii.backend.controllers.wallet;

import com.google.firebase.auth.FirebaseToken;
import com.paymii.backend.entities.User;
import com.paymii.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class WalletController {

    private final UserRepository userRepository;

    // ✅ GET /api/balance - returns current user balance
    @GetMapping("/balance")
    public ResponseEntity<?> getUserBalance() {
        try {
            // Get the authenticated Firebase user token
            FirebaseToken token = (FirebaseToken) SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal();

            // Extract Firebase UID
            String firebaseUid = token.getUid();

            // Find user by Firebase UID
            User user = userRepository.findByFirebaseUid(firebaseUid)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Return user's current balance
            return ResponseEntity.ok(Map.of("balance", user.getBalance()));

        } catch (Exception e) {
            return ResponseEntity
                    .status(401)
                    .body("Unable to fetch balance: " + e.getMessage());
        }
    }
}
