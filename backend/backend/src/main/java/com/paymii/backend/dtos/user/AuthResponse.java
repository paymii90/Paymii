package com.paymii.backend.dtos.user;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String email;
    private Long id;
    private  String isVerified;
    private  UserDto user;

}
