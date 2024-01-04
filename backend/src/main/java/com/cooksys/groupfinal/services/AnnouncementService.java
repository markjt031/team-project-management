package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.dtos.AnnouncementResponseDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;

public interface AnnouncementService {

    AnnouncementResponseDto createAnnouncement(AnnouncementRequestDto announcementRequestDto);
    AnnouncementResponseDto deleteAnnouncementById(Long announcementId, UserRequestDto userRequestDto);
}
