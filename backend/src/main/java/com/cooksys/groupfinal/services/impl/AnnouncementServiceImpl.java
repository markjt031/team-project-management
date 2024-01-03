package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AuthorizationService;
import com.cooksys.groupfinal.services.CompanyService;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AuthorizationService authorizationService;
    private final CompanyRepository companyRepository;

    private final AnnouncementRepository announcementRepository;
    private final AnnouncementMapper announcementMapper;

    @Override
    public AnnouncementDto createAnnouncement(UserRequestDto userRequestDto, AnnouncementDto announcementDto, Long companyId) {
        User requestingUser = authorizationService.userIsAdmin((userRequestDto));
        Optional<Company> requestedCompany = companyRepository.findById(companyId);
        if(requestedCompany.isEmpty()){
            throw new NotFoundException("Company with the requested id was not found.");
        }
        Announcement newAnnouncement = announcementMapper.DtoToEntity(announcementDto);
        newAnnouncement.setCompany(requestedCompany.get());
        newAnnouncement.setAuthor(requestingUser);
        newAnnouncement.setDate(Timestamp.from(Instant.now()));
        return announcementMapper.entityToDto( announcementRepository.saveAndFlush(newAnnouncement));
    }
}