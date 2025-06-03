package com.paymii.backend.dtos.user;


import lombok.Data;

@Data
public class UserDto{
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Boolean isVerified;
    private String role;

}
