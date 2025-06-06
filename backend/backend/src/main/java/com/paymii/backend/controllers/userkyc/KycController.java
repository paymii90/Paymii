package com.paymii.backend.controllers.userkyc;

import com.google.firebase.auth.FirebaseToken;
import com.paymii.backend.dtos.userkyc.KycRequest;
import com.paymii.backend.dtos.userkyc.KycStatusResponse;
import com.paymii.backend.services.KycService;
import com.paymii.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kyc")
@RequiredArgsConstructor
public class KycController {
    private final KycService kycService;
    private final UserService userService;

    @PostMapping
    public void submitKyc(@AuthenticationPrincipal FirebaseToken token, @RequestBody KycRequest req) {
        Long userId = userService.getUserIdFromFirebaseUid(token.getUid());
        kycService.submitKyc(userId, req);
    }

    @GetMapping
    public KycStatusResponse getStatus(@AuthenticationPrincipal FirebaseToken token) {
        Long userId = userService.getUserIdFromFirebaseUid(token.getUid());
        return kycService.getStatus(userId);
    }
}

