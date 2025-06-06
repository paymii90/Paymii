package com.paymii.backend.services;

import com.google.firebase.auth.FirebaseToken;
import com.paymii.backend.dtos.user.UpdateUserProfileRequest;
import com.paymii.backend.dtos.user.UserDto;

public interface UserService {
   UserDto getOrCreateUserByFirebaseToken(com.google.firebase.auth.FirebaseToken token);
    Long getUserIdFromFirebaseUid(String uid);
    //UserDto getOrCreateUserByFirebaseToken(FirebaseToken token);
    UserDto updateUserProfile(FirebaseToken token, UpdateUserProfileRequest request);

}
