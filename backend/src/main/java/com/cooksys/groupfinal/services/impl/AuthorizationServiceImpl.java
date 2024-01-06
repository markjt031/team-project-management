package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
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
    public User userIsAdmin(UserRequestDto userRequestDto) {
        if (userRequestDto==null){
            throw new BadRequestException("please provide credentials");
        }
        User requestingUser = basicUserMapper.requestDtoToEntity(userRequestDto);
        if(requestingUser.getCredentials() == null || requestingUser.getCredentials().getUsername() == null || requestingUser.getCredentials().getPassword() == null){
            throw new BadRequestException("Credentials must be supplied.");
        }

        Optional<User> existingUser = userRepository.findByCredentialsUsernameAndActiveTrue(requestingUser.getCredentials().getUsername());
        if(existingUser.isEmpty()){
            throw new NotFoundException("Admin by that id does not exist.");}

        if(existingUser.get().getCredentials().getPassword().equals(requestingUser.getCredentials().getPassword())){
            if (existingUser.get().isAdmin()){
                return existingUser.get();
            }
        }
        throw new NotAuthorizedException("You are not an admin.");
    }

    public User userIdIsAdmin(Long userId){
        Optional<User> potentialAdmin = userRepository.findById(userId);
        if(potentialAdmin.isEmpty()){throw new NotFoundException("Admin by that ID can't be located.");}
        if(!potentialAdmin.get().isAdmin()){throw new NotAuthorizedException("You are not an admin.");}
        return potentialAdmin.get();
    }
}
