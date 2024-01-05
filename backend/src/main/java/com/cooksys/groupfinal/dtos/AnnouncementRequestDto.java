package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class AnnouncementRequestDto {

    private Long authorId;

    private Long companyId;

    private String title;

    private String message;

}
