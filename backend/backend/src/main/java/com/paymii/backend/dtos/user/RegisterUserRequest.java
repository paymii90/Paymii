package com.paymii.backend.dtos.user;

import lombok.Data;

@Data
public class RegisterUserRequest {
    private String firstName;
    private String lastName;
    private String email; // Optional, for fallback—backend should trust token's email!
    private boolean emailVerified;
}
