package com.cooksys.groupfinal.services.impl;

import java.util.Optional;
import java.util.Set;

import com.cooksys.groupfinal.dtos.UserRequestDto;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProfileDto;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.Profile;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.mappers.ProfileMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
    private final FullUserMapper fullUserMapper;
	private final CredentialsMapper credentialsMapper;
	private final BasicUserMapper basicUserMapper;
	private final ProfileMapper profileMapper;

    public Set<FullUserDto> getAllUsers() {
        return fullUserMapper.entitiesToFullUserDtos(userRepository.findAllByDeletedFalse());
    }

	private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }
	
	 public boolean checkCredentials(String username) {
		    Optional<User> optionalUser = userRepository.findByCredentialsUsernameAndActiveTrue(username);
		    if (username == null || optionalUser.isEmpty()) {
		      throw new NotFoundException("credentials do not match existing user");
		    }
		    return true;
		  }

	
	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
	}

    @Override
    public FullUserDto create(UserRequestDto userRequestDto) {
        if (userRequestDto == null || userRequestDto.getCredentials() == null || userRequestDto.getProfile() == null) {
            throw new BadRequestException("User request data is incomplete.");
        }
        User user = fullUserMapper.requestDtoToEntity(userRequestDto);
        user.setActive(true);
        User savedUser = userRepository.saveAndFlush(user);
        return fullUserMapper.entityToFullUserDto(savedUser);
    }

	@Override
	public BasicUserDto deleteUser(Long id) {
		@SuppressWarnings("deprecation")
		User user = userRepository.getById(id);
		
		if (user == null) {
	        throw new EntityNotFoundException("User not found with ID: " + id);
	    }
	    
		user.setActive(false);
		return basicUserMapper.entityToBasicUserDto(user);
	}

	@Override
	public ProfileDto updateUser(UserRequestDto userRequestDto, Long id) {
		@SuppressWarnings("deprecation")
		User foundUser = userRepository.getById(id);
		
		if (foundUser == null) {
	        throw new EntityNotFoundException("User not found with ID: " + id);
	    }
		
		if (!checkCredentials(userRequestDto.getCredentials().getUsername())) {
	        throw new NotAuthorizedException("Invalid credentials provided for the user.");
	    }
		
		Profile updatedProfile = profileMapper.dtoToEntity(userRequestDto.getProfile());
		
		if (updatedProfile.getEmail() != null) {
	          foundUser.getProfile().setEmail(updatedProfile.getEmail());
	        }
	        if (updatedProfile.getFirstName() != null) {
	          foundUser.getProfile().setFirstName(updatedProfile.getFirstName());
	        }
	        if (updatedProfile.getLastName() != null) {
	          foundUser.getProfile().setLastName(updatedProfile.getLastName());
	        }
	        if (updatedProfile.getPhone() != null) {
	          foundUser.getProfile().setPhone(updatedProfile.getPhone());
	        }
		
		userRepository.saveAndFlush(foundUser);
		return profileMapper.entityToDto(foundUser.getProfile());
	}



}
