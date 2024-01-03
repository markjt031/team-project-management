package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins="*")
    public BasicUserDto deleteUser(@PathVariable Long id, @RequestBody UserRequestDto userRequestDto) {
    	return userService.deleteUser(id, userRequestDto);
    }
    
    @PutMapping("/update/{id}")
    @CrossOrigin(origins="*")
    public ProfileDto updateUser(@RequestBody UserRequestDto userRequestDto, @PathVariable Long id) {
    	return userService.updateUser(userRequestDto, id);
    }

}
