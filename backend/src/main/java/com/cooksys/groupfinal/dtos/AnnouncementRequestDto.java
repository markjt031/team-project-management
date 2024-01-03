package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class AnnouncementRequestDto {

    private UserRequestDto userRequest;
    private AnnouncementDto announcement;
    private Long companyId;

}
