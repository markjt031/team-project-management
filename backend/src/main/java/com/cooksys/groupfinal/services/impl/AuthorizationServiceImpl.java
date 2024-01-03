package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AuthorizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {
    private final BasicUserMapper basicUserMapper;
    private final UserRepository userRepository;
    @Override
    public boolean userIsAdmin(UserRequestDto userRequestDto) {
        User requestingUser = basicUserMapper.requestDtoToEntity(userRequestDto);
        if(requestingUser.getCredentials() == null || requestingUser.getCredentials().getUsername() == null || requestingUser.getCredentials().getPassword() == null){
            return false;
        }

        Optional<User> existingUser = userRepository.findByCredentialsUsernameAndActiveTrue(requestingUser.getCredentials().getUsername());
        if(existingUser.isEmpty()){
            return false;}

        if(existingUser.get().getCredentials().getPassword().equals(requestingUser.getCredentials().getPassword())){
            return existingUser.get().isAdmin() == true;
        }
        return false;
    }
}
