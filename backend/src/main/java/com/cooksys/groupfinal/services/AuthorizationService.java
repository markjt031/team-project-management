package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.User;

public interface AuthorizationService {


    public User userIsAdmin(UserRequestDto userRequestDto);

    User userIdIsAdmin(Long authorId);
}
