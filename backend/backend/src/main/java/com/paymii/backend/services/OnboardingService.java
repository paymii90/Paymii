package com.paymii.backend.services;

import com.paymii.backend.dtos.user.OnboardingStepResponse;
import com.paymii.backend.entities.OnboardingStep;
import com.paymii.backend.repositories.OnboardingStepRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OnboardingService {
    private final OnboardingStepRepository onboardingStepRepository;

    public void completeStep(Long userId, String step) {
        OnboardingStep os = onboardingStepRepository
                .findByUser_IdAndStep(userId, step)
                .orElse(new OnboardingStep());
        os.setUserId(userId);
        os.setStep(step);
        os.setCompleted(true);
        os.setCompletedAt(Instant.now());
        onboardingStepRepository.save(os);
    }

    public List<OnboardingStepResponse> getSteps(Long userId) {
        return onboardingStepRepository.findByUser_Id(userId)
                .stream()
                .map(step -> {
                    OnboardingStepResponse dto = new OnboardingStepResponse();
                    dto.setStep(step.getStep());
                    dto.setCompleted(step.getCompleted());
                    dto.setCompletedAt(step.getCompletedAt());
                    return dto;
                }).toList();
    }
}
