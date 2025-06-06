package com.paymii.backend.dtos.user;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String firebaseUid;
    private String firstName;
    private String lastName;
    private String email;
    private String profilePhoto;
    private String phoneNumber;
    private Boolean isPhoneVerified;
    private Boolean isKycCompleted;
    private String createdAt;
    private String updatedAt;
}
