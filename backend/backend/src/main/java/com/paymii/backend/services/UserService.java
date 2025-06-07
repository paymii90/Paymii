package com.paymii.backend.services;

import com.google.firebase.auth.FirebaseToken;
import com.paymii.backend.dtos.user.RegisterUserRequest;
import com.paymii.backend.dtos.user.UpdateUserProfileRequest;
import com.paymii.backend.dtos.user.UserDto;

import java.util.List;

public interface UserService {
   UserDto getOrCreateUserByFirebaseToken(com.google.firebase.auth.FirebaseToken token);
    Long getUserIdFromFirebaseUid(String uid);
    UserDto registerUser(FirebaseToken token, RegisterUserRequest request);
    //UserDto getOrCreateUserByFirebaseToken(FirebaseToken token);
    UserDto updateUserProfile(FirebaseToken token, UpdateUserProfileRequest request);
    List<UserDto> getAllUsers();
    UserDto getUserById(Long id);
    UserDto getUserByEmail(String email);
}
