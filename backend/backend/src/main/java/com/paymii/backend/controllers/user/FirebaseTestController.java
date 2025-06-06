package com.paymii.backend.controllers.user;

import com.google.firebase.FirebaseApp;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class FirebaseTestController {
    @GetMapping("/firebase")
    public String testFirebase() {
        try {
            // Just checking initialization
            FirebaseApp.getInstance();
            return "Firebase initialized!";
        } catch (Exception e) {
            return "Firebase NOT initialized: " + e.getMessage();
        }
    }
}
