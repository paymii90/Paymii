package com.paymii.backend.dtos.user;

import lombok.Data;

@Data
public class UpdateUserProfileRequest {
    private String firstName;
    private String lastName;
    private String profilePhoto;
}