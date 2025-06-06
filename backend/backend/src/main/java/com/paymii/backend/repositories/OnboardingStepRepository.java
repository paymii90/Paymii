package com.paymii.backend.repositories;


import com.paymii.backend.entities.OnboardingStep;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OnboardingStepRepository extends JpaRepository<OnboardingStep, Long> {
    List<OnboardingStep> findByUserId(Long id);
    Optional<OnboardingStep> findByUserIdAndStep(Long userId, String step);
}

