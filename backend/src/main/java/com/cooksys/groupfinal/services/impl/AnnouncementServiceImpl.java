package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.dtos.AnnouncementResponseDto;
import com.cooksys.groupfinal.dtos.AnnouncementUpdateDto;
import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.UserIdRequestDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
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
    private final UserRepository userRepository;

    private final AnnouncementRepository announcementRepository;
    private final AnnouncementMapper announcementMapper;

    @Override
    public AnnouncementResponseDto createAnnouncement(AnnouncementRequestDto announcementRequestDto) {
        if (announcementRequestDto==null ||announcementRequestDto.getAuthorId()==null || announcementRequestDto.getCompanyId()==null || announcementRequestDto.getMessage()==null || announcementRequestDto.getTitle()==null){
            throw new BadRequestException("please proved announcement title and message, company id, and posting user");
        }
        User requestingUser = userRepository.getById(announcementRequestDto.getAuthorId());
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

    @Override
    public AnnouncementResponseDto deleteAnnouncementById(Long announcementId, UserIdRequestDto userId) {
        // Check if the user is an admin
        // User requestingUser = authorizationService.userIsAdmin(userRequestDto);

        if (userId==null){
            throw new BadRequestException("Please provide the requesting user's id");
        }
        // Fetch the announcement
        Announcement announcementToDelete = announcementRepository.findById(announcementId)
                .orElseThrow(() -> new NotFoundException("Announcement with ID " + announcementId + " not found."));

        if (announcementToDelete.getAuthor().getId()!=userId.getUserId()){
            throw new BadRequestException("Attempting to delete post not authored by the requesting user");
        }

        // Delete the announcement
        announcementRepository.delete(announcementToDelete);
        announcementRepository.flush();

        // Return the details of the deleted announcement
        return announcementMapper.entityToResponseDto(announcementToDelete);
    }

    @Override
    public AnnouncementResponseDto updateAnnouncementById(Long announcementId, AnnouncementRequestDto announcementToUpdate) {
        //check if dto is null
        if (announcementToUpdate==null){
            throw new BadRequestException("The announcement to update is null");
        }
        //find the announcement by id
        Announcement announcement = announcementRepository.findById(announcementId)
                .orElseThrow(() -> new NotFoundException("Announcement with ID " + announcementId + " not found."));

        //Check if the original post's author matches the author of the request body
        if (announcement.getAuthor().getId()!=announcementToUpdate.getAuthorId()){
            throw new BadRequestException("User id provided does not match the post's author");
        }
        return announcementMapper.entityToResponseDto( announcementRepository.saveAndFlush(announcementMapper.requestDtoToEntity(announcementToUpdate)));
    }
}