package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.*;

import java.util.Set;

import org.springframework.http.ResponseEntity;

public interface UserService {

    Set<FullUserDto> getAllUsers();

	ResponseEntity<?> login(CredentialsDto credentialsDto);

    FullUserDto create(UserRequestDto userRequestDto);


	BasicUserDto deleteUser(Long id,UserRequestDto userRequestDto);


	ProfileDto updateUser(UserRequestDto userRequestDto, Long id);

	ProfileDto getUserProfile(Long userId);
}
