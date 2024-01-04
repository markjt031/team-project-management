package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.dtos.AnnouncementResponseDto;

public interface AnnouncementService {

    AnnouncementResponseDto createAnnouncement(AnnouncementRequestDto announcementRequestDto);
}
