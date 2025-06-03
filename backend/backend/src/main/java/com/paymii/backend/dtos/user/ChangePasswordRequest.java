package com.paymii.backend.dtos.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChangePasswordRequest {
    @NotNull
    private String currentPassword;

    @NotNull
    @Size(min = 6, max = 24)
    private  String newPassword;
}
