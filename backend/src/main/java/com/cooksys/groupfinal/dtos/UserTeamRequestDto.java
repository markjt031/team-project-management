package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UserTeamRequestDto {

    private UserRequestDto admin;
    private BasicUserDto newTeammate;
}
