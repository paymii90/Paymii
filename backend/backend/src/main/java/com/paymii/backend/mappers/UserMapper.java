package com.paymii.backend.mappers;

import com.paymii.backend.dtos.user.AuthResponse;
import com.paymii.backend.dtos.user.RegisterUserRequest;
import com.paymii.backend.dtos.user.UpdateUserRequest;
import com.paymii.backend.dtos.user.UserDto;
import com.paymii.backend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);
//    @Mapping(source = "firstName", target = "firstName")
//    @Mapping(source = "lastName", target = "lastName")
//    @Mapping(source = "email", target = "email")
//    @Mapping(source = "password", target = "password")
//    @Mapping(source = "isVerified", target ="isVerified")
    User toEntity(RegisterUserRequest request);
    User toEntity(UserDto userDto);
    void updateEntityFromDto(UpdateUserRequest request, @MappingTarget User user);

    default AuthResponse toAuthResponse(User user, String token) {
        AuthResponse r = new AuthResponse();
        r.setToken(token);
        r.setId(user.getId());
        r.setEmail(user.getEmail());
        r.setUser(toDto(user));
        return r;
    }
}
