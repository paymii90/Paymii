package com.paymii.backend.services;

import com.paymii.backend.dtos.userkyc.KycRequest;
import com.paymii.backend.dtos.userkyc.KycStatusResponse;
import com.paymii.backend.entities.UserKyc;
import com.paymii.backend.repositories.UserKycRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class KycService {
    private final UserKycRepository userKycRepository;

    public void submitKyc(Long userId, KycRequest req) {
        UserKyc kyc = userKycRepository.findByUserId(userId).orElse(new UserKyc());
        kyc.setId(kyc.getId());
        kyc.setCitizenship(req.getCitizenship());
        kyc.setLegalFirstName(req.getLegalFirstName());
        kyc.setLegalLastName(req.getLegalLastName());
        kyc.setDateOfBirth(req.getDateOfBirth());
        kyc.setAddress(req.getAddress());
        kyc.setKycStatus("PENDING");
        kyc.setCreatedAt(kyc.getCreatedAt() == null ? Instant.now() : kyc.getCreatedAt());
        kyc.setUpdatedAt(Instant.now());
        userKycRepository.save(kyc);
    }

    public KycStatusResponse getStatus(Long userId) {
        UserKyc kyc = userKycRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("KYC not submitted"));
        KycStatusResponse resp = new KycStatusResponse();
        resp.setKycStatus(kyc.getKycStatus());
        resp.setSubmittedAt(kyc.getCreatedAt());
        return resp;
    }
}
