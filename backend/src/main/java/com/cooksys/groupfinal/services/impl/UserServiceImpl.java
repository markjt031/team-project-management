package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.Profile;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.CompanyMapper;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.mappers.ProfileMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.security.jwt.JwtUtils;
import com.cooksys.groupfinal.security.services.UserDetailsImpl;
import com.cooksys.groupfinal.services.UserService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	@Autowired
	private final UserRepository userRepository;

	@Autowired
    private final FullUserMapper fullUserMapper;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	AuthenticationManager authenticationManager;


	private final CredentialsMapper credentialsMapper;
	private final BasicUserMapper basicUserMapper;
	private final ProfileMapper profileMapper;
	private final CompanyMapper companyMapper;
	private final TeamMapper teamMapper;

	@Override
	public Set<FullUserDto> getAllUsers() {
		List<User> userList = userRepository.findAll();
		Set<User> users = new HashSet<>(userList);
		return fullUserMapper.entitiesToFullUserDtos(users);
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
	public ResponseEntity<?> login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
		Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(credentialsDto.getUsername(), credentialsDto.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt=jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails=(UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
			.map(item->item.getAuthority())
			.collect(Collectors.toList());

        User userToValidate = findUser(credentialsDto.getUsername());
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userRepository.saveAndFlush(userToValidate);
        }
		
        return ResponseEntity.ok(new JwtResponseDto(jwt, userDetails.getId(), userDetails.getUsername(), profileMapper.entityToDto(userDetails.getProfile()), companyMapper.entitiesToDtos(userDetails.getCompanies()), teamMapper.entitiesToDtos(userDetails.getTeams()), roles));
	}

    @Override
    public FullUserDto create(UserRequestDto userRequestDto) {
        if (userRequestDto == null || userRequestDto.getCredentials() == null || userRequestDto.getProfile() == null) {
            throw new BadRequestException("User request data is incomplete.");
        }
		if (userRepository.findByCredentialsUsername(userRequestDto.getCredentials().getUsername()).isPresent() ||userRepository.findByProfileEmail(userRequestDto.getProfile().getEmail()).isPresent() ){
			throw new BadRequestException("user with specified username or password already exists");
		}
		Credentials credentials=new Credentials(userRequestDto.getCredentials().getUsername(), encoder.encode(userRequestDto.getCredentials().getPassword()));
		Profile profile=new Profile(userRequestDto.getProfile().getFirstName(), userRequestDto.getProfile().getLastName(), userRequestDto.getProfile().getEmail());
		User user = new User(credentials, profile, true, userRequestDto.isAdmin());

        User savedUser = userRepository.saveAndFlush(user);
        return fullUserMapper.entityToFullUserDto(savedUser);
    }

	@Override
	public BasicUserDto deleteUser(Long id, UserRequestDto userRequestDto) {
		if (userRequestDto==null || userRequestDto.getCredentials()==null || userRequestDto.getProfile()==null){
			throw new BadRequestException("must provide credentials and profile of requesting user");
		}
		User user = userRepository.getById(id);
		System.out.println(userRequestDto);
		if (user == null) {
	        throw new EntityNotFoundException("User not found with ID: " + id);
	    }
		
		if (!checkCredentials(userRequestDto.getCredentials().getUsername())) {
	        throw new NotAuthorizedException("Invalid credentials provided for the user.");
	    }
		if(!user.isAdmin()) {
			throw new NotAuthorizedException("Restricted action, contact administrator.");
		}
	    
		user.setActive(false);
		return basicUserMapper.entityToBasicUserDto(user);
	}

	@Override
	public ProfileDto updateUser(UserRequestDto userRequestDto, Long id) {
		if (userRequestDto==null || userRequestDto.getCredentials()==null || userRequestDto.getProfile()==null){
			throw new BadRequestException("please provide a user to update");
		}

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

	@Override
	public ProfileDto getUserProfile(Long userId) {
		Optional<User> userOptional = userRepository.findById(userId);
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			return fullUserMapper.entityToFullUserDto(user).getProfile();
		} else {
			throw new NotFoundException("User not found");
		}
	}


}
