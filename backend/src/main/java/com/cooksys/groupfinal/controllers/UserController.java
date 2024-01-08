package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.services.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins="http://localhost:4200", allowCredentials = "true")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WORKER')")
    public Set<FullUserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WORKER')")
    public ProfileDto getUserProfile(@PathVariable Long userId) {
        return userService.getUserProfile(userId);
    }

	@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CredentialsDto credentialsDto) {
        return userService.login(credentialsDto);
    }

    @PostMapping("/register")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public FullUserDto create(@RequestBody UserRequestDto userRequestDto) {
        return userService.create(userRequestDto);
    }
    
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public BasicUserDto deleteUser(@PathVariable Long id, @RequestBody UserRequestDto userRequestDto) {
    	return userService.deleteUser(id, userRequestDto);
    }
    
    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WORKER')")
    public ProfileDto updateUser(@RequestBody UserRequestDto userRequestDto, @PathVariable Long id) {
    	return userService.updateUser(userRequestDto, id);
    }

}
