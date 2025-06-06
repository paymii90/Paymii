package com.paymii.backend.dtos.userdocument;

import lombok.Data;

import java.time.Instant;

@Data
public class DocumentStatusResponse {
    private String docType;
    private String status;
    private String fileUrl;
    private Instant submittedAt;
}
