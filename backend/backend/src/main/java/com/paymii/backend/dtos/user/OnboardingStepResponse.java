package com.paymii.backend.dtos.user;

import lombok.Data;

import java.time.Instant;

@Data
public class OnboardingStepResponse {
    private String step;
    private boolean completed;
    private Instant completedAt;
}