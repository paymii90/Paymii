package com.paymii.backend.repositories;


import com.paymii.backend.entities.OnboardingStep;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OnboardingStepRepository extends JpaRepository<OnboardingStep, Long> {
    List<OnboardingStep> findByUser_Id(Long id);
    Optional<OnboardingStep> findByUser_IdAndStep(Long userId, String step);
}

