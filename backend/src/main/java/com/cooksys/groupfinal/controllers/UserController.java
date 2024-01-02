package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.UserRequestDto;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProfileDto;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

import java.util.Set;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;

    @GetMapping
    @CrossOrigin(origins="*")
    public Set<FullUserDto> getAllUsers() {
        return userService.getAllUsers();
    }

	@PostMapping("/login")
	@CrossOrigin(origins="*")
    public FullUserDto login(@RequestBody CredentialsDto credentialsDto) {
        return userService.login(credentialsDto);
    }

    @PostMapping("/register")
    @CrossOrigin(origins="*")
    public FullUserDto create(@RequestBody UserRequestDto userRequestDto) {
        return userService.create(userRequestDto);
    }
    
    @DeleteMapping("/{id}")
    @CrossOrigin(origins="*")
    public BasicUserDto deleteUser(@PathVariable Long id) {
    	return userService.deleteUser(id);
    }
    
    @PutMapping("/update/{id}")
    @CrossOrigin(origins="*")
    public ProfileDto updateUser(@RequestBody UserRequestDto userRequestDto, @PathVariable Long id) {
    	return userService.updateUser(userRequestDto, id);
    }

}
