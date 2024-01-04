package com.cooksys.groupfinal.dtos;

import java.sql.Timestamp;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class AnnouncementDto {

    private String title;
    
    private String message;
    
    private BasicUserDto author;

}
