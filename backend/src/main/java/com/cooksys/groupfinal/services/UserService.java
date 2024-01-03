package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.*;

import java.util.Set;

public interface UserService {

    Set<FullUserDto> getAllUsers();

	FullUserDto login(CredentialsDto credentialsDto);

    FullUserDto create(UserRequestDto userRequestDto);


	BasicUserDto deleteUser(Long id,UserRequestDto userRequestDto);


	ProfileDto updateUser(UserRequestDto userRequestDto, Long id);

}
