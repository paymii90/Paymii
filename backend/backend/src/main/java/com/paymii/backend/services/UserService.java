package com.paymii.backend.services;

import com.paymii.backend.dtos.user.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserService {
    UserDto        register(RegisterUserRequest request);
    AuthResponse   login(UserLoginRequest request);
    UserDto        update(Long id, UpdateUserRequest request);
    void            changePassword(Long id, ChangePasswordRequest request);
    void           deleteUser(Long id);
    UserDto       getUserById(Long id);
    List<UserDto>  getAllUsers();

}
