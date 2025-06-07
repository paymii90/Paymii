package com.paymii.backend.controllers.user;

import com.google.firebase.auth.FirebaseToken;
import com.paymii.backend.dtos.user.UpdateUserProfileRequest;
import com.paymii.backend.dtos.user.UserDto;
import com.paymii.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/me")
@RequiredArgsConstructor
public class ProfileController {
    private final UserService userService;

    @GetMapping
    public UserDto getProfile(@AuthenticationPrincipal FirebaseToken token) {
        return userService.getOrCreateUserByFirebaseToken(token);
    }
    @PutMapping
    public UserDto updateProfile(@AuthenticationPrincipal FirebaseToken token,
                                 @RequestBody UpdateUserProfileRequest request) {
        return userService.updateUserProfile(token, request);
    }


}
