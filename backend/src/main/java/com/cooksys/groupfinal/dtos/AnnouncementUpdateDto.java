package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class AnnouncementUpdateDto {
	
	Long userId;
    AnnouncementRequestDto announcementRequest;
    
}