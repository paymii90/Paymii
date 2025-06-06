package com.paymii.backend.services.implementation;

import com.google.firebase.auth.FirebaseToken;
import com.paymii.backend.dtos.user.UpdateUserProfileRequest;
import com.paymii.backend.dtos.user.UserDto;
import com.paymii.backend.entities.User;
import com.paymii.backend.mappers.UserMapper;
import com.paymii.backend.repositories.UserRepository;
import com.paymii.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    @Override
    public UserDto getOrCreateUserByFirebaseToken(FirebaseToken token) {
        Optional<User> userOpt = userRepository.findByFirebaseUid(token.getUid());
        User user;
        // Try to get the phone number from the claims
        String phoneNumber = (String) token.getClaims().get("phone_number");

        if (userOpt.isPresent()) {
            user = userOpt.get();
        } else {
            // First time login, create a new user record
            user = User.builder()
                    .firebaseUid(token.getUid())
                    .email(token.getEmail())
                    .isPhoneVerified(phoneNumber != null)
                    .createdAt(java.time.Instant.now())
                    .updatedAt(java.time.Instant.now())
                    .build();
            user = userRepository.save(user);
        }
        return userMapper.toDto(user);
    }
    @Override
    public Long getUserIdFromFirebaseUid(String firebaseUid) {
        User user = userRepository.findByFirebaseUid(firebaseUid)
                .orElseThrow(() -> new RuntimeException("User not found for firebaseUid: " + firebaseUid));
        return user.getId();
    }

    @Override
    public UserDto updateUserProfile(FirebaseToken token, UpdateUserProfileRequest request) {
        User user = userRepository.findByFirebaseUid(token.getUid())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (request.getFirstName() != null) user.setFirstName(request.getFirstName());
        if (request.getLastName() != null) user.setLastName(request.getLastName());
        if (request.getProfilePhoto() != null) user.setProfilePhoto(request.getProfilePhoto());
        user.setUpdatedAt(Instant.now());
        user = userRepository.save(user);
        return userMapper.toDto(user);
    }

}