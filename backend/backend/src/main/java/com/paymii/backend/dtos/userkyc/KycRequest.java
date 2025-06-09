package com.paymii.backend.dtos.userkyc;

import lombok.Data;

import java.time.LocalDate;

@Data
public class KycRequest {
    private String citizenship;
    private String legalFirstName;
    private String legalLastName;
    private LocalDate dateOfBirth;
    private String address;
}