package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
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
	public AnnouncementDto createAnnouncement(@RequestBody AnnouncementRequestDto announcementRequestDto) {
		Long companyId = announcementRequestDto.getCompanyId();
		UserRequestDto userRequest = announcementRequestDto.getUserRequest();
		AnnouncementDto announcementDto = announcementRequestDto.getAnnouncement();
		return announcementService.createAnnouncement(userRequest, announcementDto, companyId);
	}

}
