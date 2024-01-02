package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;

import java.util.Set;

public interface UserService {

    Set<FullUserDto> getAllUsers();

	FullUserDto login(CredentialsDto credentialsDto);

    FullUserDto create(UserRequestDto userRequestDto);

}
