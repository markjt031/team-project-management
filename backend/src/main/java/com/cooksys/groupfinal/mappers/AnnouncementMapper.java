package com.cooksys.groupfinal.mappers;

import java.util.Set;

import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.dtos.AnnouncementResponseDto;
import org.mapstruct.Mapper;

import com.cooksys.groupfinal.entities.Announcement;

@Mapper(componentModel = "spring", uses = { BasicUserMapper.class })
public interface AnnouncementMapper {

    AnnouncementResponseDto entityToResponseDto(Announcement announcement);

  Set<AnnouncementResponseDto> entitiesToResponseDtos(Set<Announcement> announcement);



  Announcement requestDtoToEntity(AnnouncementRequestDto announcementRequestDto);
    
}
