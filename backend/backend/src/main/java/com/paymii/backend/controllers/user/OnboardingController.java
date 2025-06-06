package com.paymii.backend.controllers.user;

import com.google.firebase.auth.FirebaseToken;
import com.paymii.backend.dtos.user.OnboardingStepRequest;
import com.paymii.backend.dtos.user.OnboardingStepResponse;
import com.paymii.backend.services.OnboardingService;
import com.paymii.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/onboarding-steps")
@RequiredArgsConstructor
public class OnboardingController {
    private final OnboardingService onboardingService;
    private final UserService userService;

    @GetMapping
    public List<OnboardingStepResponse> getSteps(@AuthenticationPrincipal FirebaseToken token) {
        Long userId = userService.getUserIdFromFirebaseUid(token.getUid());
        return onboardingService.getSteps(userId);
    }

    @PostMapping
    public void completeStep(@AuthenticationPrincipal FirebaseToken token,
                             @RequestBody OnboardingStepRequest req) {
        Long userId = userService.getUserIdFromFirebaseUid(token.getUid());
        onboardingService.completeStep(userId, req.getStep());
    }
}

