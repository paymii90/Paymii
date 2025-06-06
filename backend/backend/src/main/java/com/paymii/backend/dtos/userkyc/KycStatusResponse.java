package com.paymii.backend.dtos.userkyc;

import lombok.Data;
import java.time.Instant;

@Data
public class KycStatusResponse {
    private String kycStatus;
    private Instant submittedAt;
}