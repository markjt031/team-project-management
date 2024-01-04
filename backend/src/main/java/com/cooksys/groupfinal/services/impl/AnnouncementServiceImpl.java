package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.dtos.AnnouncementResponseDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.services.AuthorizationService;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AuthorizationService authorizationService;
    private final CompanyRepository companyRepository;

    private final AnnouncementRepository announcementRepository;
    private final AnnouncementMapper announcementMapper;

    @Override
    public AnnouncementResponseDto createAnnouncement(AnnouncementRequestDto announcementRequestDto) {
        User requestingUser = authorizationService.userIdIsAdmin(announcementRequestDto.getAuthorId());
        Optional<Company> requestedCompany = companyRepository.findById(announcementRequestDto.getCompanyId());
        if(requestedCompany.isEmpty()){
            throw new NotFoundException("Company with the requested id was not found.");
        }
        Announcement newAnnouncement = new Announcement();
        newAnnouncement.setAuthor(requestingUser);
        newAnnouncement.setCompany(requestedCompany.get());
        newAnnouncement.setTitle(announcementRequestDto.getTitle());
        newAnnouncement.setMessage(announcementRequestDto.getMessage());
        newAnnouncement.setDate(Timestamp.from(Instant.now()));
        return announcementMapper.entityToResponseDto( announcementRepository.saveAndFlush(newAnnouncement));
    }
}