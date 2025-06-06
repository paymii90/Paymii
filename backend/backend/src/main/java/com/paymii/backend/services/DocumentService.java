package com.paymii.backend.services;

import com.paymii.backend.dtos.userdocument.DocumentStatusResponse;
import com.paymii.backend.dtos.userdocument.DocumentUploadRequest;
import com.paymii.backend.entities.UserDocument;
import com.paymii.backend.repositories.UserDocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService {
    private final UserDocumentRepository userDocumentRepository;

    public void uploadDocument(Long userId, DocumentUploadRequest req) {
        UserDocument doc = new UserDocument();
        doc.setUserId(userId);
        doc.setDocType(req.getDocType());
        doc.setDocUrl(req.getFileUrl());
        doc.setStatus("PENDING");
        doc.setCreatedAt(Instant.now());
        doc.setUpdatedAt(Instant.now());
        userDocumentRepository.save(doc);
    }

    public List<DocumentStatusResponse> getUserDocuments(Long userId) {
        return userDocumentRepository.findByUserId(userId).stream().map(doc -> {
            DocumentStatusResponse resp = new DocumentStatusResponse();
            resp.setDocType(doc.getDocType());
            resp.setStatus(doc.getStatus());
            resp.setFileUrl(doc.getDocUrl());
            resp.setSubmittedAt(doc.getUploadedAt());
            return resp;
        }).toList();
    }
}

