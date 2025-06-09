package com.paymii.backend.controllers.userdocument;

import com.google.firebase.auth.FirebaseToken;
import com.paymii.backend.dtos.userdocument.DocumentStatusResponse;
import com.paymii.backend.dtos.userdocument.DocumentUploadRequest;
import com.paymii.backend.services.DocumentService;
import com.paymii.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-documents")
@RequiredArgsConstructor
public class UserDocumentController {
    private final DocumentService documentService;
    private final UserService userService;

    @PostMapping
    public void uploadDocument(@AuthenticationPrincipal FirebaseToken token,
                               @RequestBody DocumentUploadRequest req) {
        Long userId = userService.getUserIdFromFirebaseUid(token.getUid());
        documentService.uploadDocument(userId, req);
    }

    @GetMapping
    public List<DocumentStatusResponse> getUserDocuments(@AuthenticationPrincipal FirebaseToken token) {
        Long userId = userService.getUserIdFromFirebaseUid(token.getUid());
        return documentService.getUserDocuments(userId);
    }
}
