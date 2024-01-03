package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Announcement;

public interface AnnouncementService {


    AnnouncementDto createAnnouncement(UserRequestDto userRequestDto, AnnouncementDto announcementDto, Long companyId);
}
