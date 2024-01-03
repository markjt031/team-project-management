package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.UserRequestDto;

public interface AuthorizationService {


    public boolean userIsAdmin(UserRequestDto userRequestDto);
}
