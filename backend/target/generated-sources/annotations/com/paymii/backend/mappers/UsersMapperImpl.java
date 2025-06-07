package com.paymii.backend.mappers;

import com.paymii.backend.dtos.user.UserDto;
import com.paymii.backend.entities.User;
import java.time.Instant;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-07T18:04:08+0000",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.15 (Microsoft)"
)
@Component
public class UsersMapperImpl implements UsersMapper {

    @Override
    public UserDto toDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        userDto.setId( user.getId() );
        userDto.setFirebaseUid( user.getFirebaseUid() );
        userDto.setFirstName( user.getFirstName() );
        userDto.setLastName( user.getLastName() );
        userDto.setEmail( user.getEmail() );
        userDto.setProfilePhoto( user.getProfilePhoto() );
        userDto.setPhoneNumber( user.getPhoneNumber() );
        userDto.setIsPhoneVerified( user.getIsPhoneVerified() );
        userDto.setVerified( user.isVerified() );
        userDto.setIsKycCompleted( user.getIsKycCompleted() );
        if ( user.getCreatedAt() != null ) {
            userDto.setCreatedAt( user.getCreatedAt().toString() );
        }
        if ( user.getUpdatedAt() != null ) {
            userDto.setUpdatedAt( user.getUpdatedAt().toString() );
        }

        return userDto;
    }

    @Override
    public User toEntity(UserDto userDto) {
        if ( userDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.id( userDto.getId() );
        user.firebaseUid( userDto.getFirebaseUid() );
        user.firstName( userDto.getFirstName() );
        user.lastName( userDto.getLastName() );
        user.email( userDto.getEmail() );
        user.profilePhoto( userDto.getProfilePhoto() );
        user.verified( userDto.isVerified() );
        user.phoneNumber( userDto.getPhoneNumber() );
        user.isPhoneVerified( userDto.getIsPhoneVerified() );
        user.isKycCompleted( userDto.getIsKycCompleted() );
        if ( userDto.getCreatedAt() != null ) {
            user.createdAt( Instant.parse( userDto.getCreatedAt() ) );
        }
        if ( userDto.getUpdatedAt() != null ) {
            user.updatedAt( Instant.parse( userDto.getUpdatedAt() ) );
        }

        return user.build();
    }
}
