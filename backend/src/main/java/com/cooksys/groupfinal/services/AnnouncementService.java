package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.dtos.AnnouncementResponseDto;
import com.cooksys.groupfinal.dtos.AnnouncementUpdateDto;
import com.cooksys.groupfinal.dtos.UserIdRequestDto;


public interface AnnouncementService {

    AnnouncementResponseDto createAnnouncement(AnnouncementRequestDto announcementRequestDto);
    AnnouncementResponseDto deleteAnnouncementById(Long announcementId, UserIdRequestDto userId);

    AnnouncementResponseDto updateAnnouncementById(Long announcementId, AnnouncementRequestDto announcementToUpdate);
}
