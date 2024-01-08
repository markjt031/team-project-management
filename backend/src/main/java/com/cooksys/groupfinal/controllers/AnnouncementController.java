package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.User;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
public class AnnouncementController {


	private final AnnouncementService announcementService;

	@PostMapping
	@CrossOrigin(origins="*")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public AnnouncementResponseDto createAnnouncement(@RequestBody AnnouncementRequestDto announcementRequestDto) {
		return announcementService.createAnnouncement(announcementRequestDto);
	}

	@DeleteMapping("/{announcementId}")
	@CrossOrigin(origins="*")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public AnnouncementResponseDto deleteAnnouncementById(@PathVariable Long announcementId, @RequestBody UserIdRequestDto userId){
		return announcementService.deleteAnnouncementById(announcementId, userId);
	}

	@PutMapping("/{announcementId}")
	@CrossOrigin(origins="*")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public AnnouncementResponseDto updateAnnouncementById(@PathVariable Long announcementId, @RequestBody AnnouncementRequestDto announcementToUpdate){
		return announcementService.updateAnnouncementById(announcementId, announcementToUpdate);
	}

}
