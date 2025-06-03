package com.paymii.backend.controllers.user;

import com.paymii.backend.dtos.user.AuthResponse;
import com.paymii.backend.dtos.user.UserDto;
import com.paymii.backend.dtos.user.UserLoginRequest;
import com.paymii.backend.dtos.user.RegisterUserRequest;
import com.paymii.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/auth",produces = "application/json")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(
            @Valid @RequestBody RegisterUserRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody UserLoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }
}
