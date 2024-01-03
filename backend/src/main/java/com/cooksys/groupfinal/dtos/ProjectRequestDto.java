package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ProjectRequestDto {
    private ProjectDto projectDto;
    private UserRequestDto admin;
}
