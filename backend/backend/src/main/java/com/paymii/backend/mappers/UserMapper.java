package com.paymii.backend.mappers;

import com.paymii.backend.dtos.user.UserDto;
import com.paymii.backend.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);
}
