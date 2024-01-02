package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.UserRequestDto;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	
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

}
