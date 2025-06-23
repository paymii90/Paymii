package com.paymii.backend.controllers.paymentmethod;

import com.google.firebase.auth.FirebaseToken;
import com.paymii.backend.entities.PaymentMethod;
import com.paymii.backend.entities.User;
import com.paymii.backend.repositories.PaymentMethodRepository;
import com.paymii.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/payment-methods")
@RequiredArgsConstructor
public class PaymentMethodController {

    private final UserRepository userRepository;
    private final PaymentMethodRepository paymentMethodRepository;

    // ✅ Add a new card or mobile money method
    @PostMapping
    public ResponseEntity<?> addMethod(@RequestBody PaymentMethod req) {
        try {
            FirebaseToken token = (FirebaseToken) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String firebaseUid = token.getUid();

            User user = userRepository.findByFirebaseUid(firebaseUid)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            req.setUser(user);
            req.setCreatedAt(Instant.now());

            // 🔒 Mask card numbers for security
            if ("card".equalsIgnoreCase(req.getType()) && req.getCardNumber() != null) {
                String last4 = req.getCardNumber();
                if (last4.length() > 4) {
                    last4 = last4.substring(last4.length() - 4);
                }
                req.setCardNumber("**** **** **** " + last4);
            }

            PaymentMethod saved = paymentMethodRepository.save(req);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding method: " + e.getMessage());
        }
    }

    // ✅ Get all payment methods for the authenticated user
    @GetMapping
    public ResponseEntity<?> getUserMethods() {
        try {
            FirebaseToken token = (FirebaseToken) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String firebaseUid = token.getUid();

            User user = userRepository.findByFirebaseUid(firebaseUid)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<PaymentMethod> methods = paymentMethodRepository.findAllByUser(user);
            return ResponseEntity.ok(methods);

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Unable to fetch methods: " + e.getMessage());
        }
    }
}
