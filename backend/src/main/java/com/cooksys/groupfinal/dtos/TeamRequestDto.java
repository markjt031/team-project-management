package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TeamRequestDto {
    
    private NewTeamRequestDto team;
    
    private UserRequestDto validation; 
}
