package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;

public interface UserService {

    List<FullUserDto> getAllUsers()

	FullUserDto login(CredentialsDto credentialsDto);

    FullUserDto create(UserRequestDto userRequestDto);

}
