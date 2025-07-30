package com.paymii.backend.controllers.user;

import com.google.firebase.auth.FirebaseToken;
import com.paymii.backend.dtos.user.RegisterUserRequest;
import com.paymii.backend.dtos.user.UserDto;
import com.paymii.backend.entities.User;
import com.paymii.backend.repositories.UserRepository;
import com.paymii.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    // ✅ Simplified using @AuthenticationPrincipal
    @PostMapping("/register")
    public UserDto register(@AuthenticationPrincipal FirebaseToken token,
                            @RequestBody RegisterUserRequest request) {
        return userService.registerUser(token, request);
    }

    // 🔍 Get all users
    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    // 🔍 Get user by ID
    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // 🔍 Get user by email
    @GetMapping("/by-email")
    public UserDto getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }

    // 💰 Top up user balance
    @PostMapping("/top-up")
    public ResponseEntity<?> topUp(@AuthenticationPrincipal FirebaseToken token,
                                   @RequestParam BigDecimal amount) {
        String uid = token.getUid();

        User user = userRepository.findByFirebaseUid(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setBalance(user.getBalance().add(amount));
        userRepository.save(user);

        return ResponseEntity.ok("Balance updated");
    }
}
