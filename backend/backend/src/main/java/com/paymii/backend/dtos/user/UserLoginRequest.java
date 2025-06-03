package com.paymii.backend.dtos.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserLoginRequest {
    @NotNull
    @Email
    private String email;

    @NotNull
    @Size(min = 6, max = 24)
    private String password;
}
