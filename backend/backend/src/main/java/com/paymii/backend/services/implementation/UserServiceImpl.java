package com.paymii.backend.services.implementation;

import com.google.firebase.auth.FirebaseToken;
import com.paymii.backend.dtos.user.RegisterUserRequest;
import com.paymii.backend.dtos.user.UpdateUserProfileRequest;
import com.paymii.backend.dtos.user.UserDto;
import com.paymii.backend.entities.User;
import com.paymii.backend.mappers.UsersMapper;
import com.paymii.backend.repositories.UserRepository;
import com.paymii.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UsersMapper usersMapper;

    // Create user if not exists, else return existing user
    @Override
    public UserDto getOrCreateUserByFirebaseToken(FirebaseToken token) {
        String firebaseUid = token.getUid();
        String email = token.getEmail();

        Optional<User> userOpt = userRepository.findByFirebaseUid(firebaseUid);
        User user;
        if (userOpt.isPresent()) {
            user = userOpt.get();
        } else {
            user = User.builder()
                    .firebaseUid(firebaseUid)
                    .email(email)
                    .createdAt(Instant.now())
                    .updatedAt(Instant.now())
                    .build();
            user = userRepository.save(user);
        }
        return usersMapper.toDto(user);
    }

    // Update profile
    @Override
    public UserDto updateUserProfile(FirebaseToken token, UpdateUserProfileRequest request) {
        String firebaseUid = token.getUid();

        User user = userRepository.findByFirebaseUid(firebaseUid)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        // Only update allowed fields
        if (request.getFirstName() != null) user.setFirstName(request.getFirstName());
        if (request.getLastName() != null) user.setLastName(request.getLastName());
        if (request.getProfilePhoto() != null) user.setProfilePhoto(request.getProfilePhoto());

        user.setUpdatedAt(Instant.now());
        user = userRepository.save(user);

        return usersMapper.toDto(user);
    }

    @Override
    public Long getUserIdFromFirebaseUid(String uid) {
        return userRepository.findByFirebaseUid(uid)
                .map(User::getId)
                .orElse(null);
    }

    @Override
    public UserDto registerUser(FirebaseToken token, RegisterUserRequest request) {
        String firebaseUid = token.getUid();
        String emailFromToken = token.getEmail();
        boolean emailVerified = token.isEmailVerified();

        // Prefer email from token
        String email = emailFromToken != null ? emailFromToken : request.getEmail();

        // Check if user already exists
        User user = userRepository.findByFirebaseUid(firebaseUid)
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .firebaseUid(firebaseUid)
                            .email(email)
                            .firstName(request.getFirstName())
                            .lastName(request.getLastName())
                            .verified(emailVerified)
                            .build();
                    return userRepository.save(newUser);
                });

        return toDto(user);
    }

    private UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFirebaseUid(user.getFirebaseUid());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setVerified(user.isVerified());
        return dto;
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(usersMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return usersMapper.toDto(user);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return toDto(user);
    }
}



