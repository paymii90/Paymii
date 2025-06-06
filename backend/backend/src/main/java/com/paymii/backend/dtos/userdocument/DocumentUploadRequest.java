package com.paymii.backend.dtos.userdocument;

import lombok.Data;

@Data
public class DocumentUploadRequest {
    private String docType;
    private String fileUrl;
}
