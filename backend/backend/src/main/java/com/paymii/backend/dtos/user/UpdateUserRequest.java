package com.paymii.backend.dtos.user;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class UpdateUserRequest {
    private String firstName;
    private String lastName;

    @Email
    private String email;
}
