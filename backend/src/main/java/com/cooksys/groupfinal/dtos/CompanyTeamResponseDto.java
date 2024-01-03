package com.cooksys.groupfinal.dtos;

import java.util.Set;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class CompanyTeamResponseDto {
	
    
    private String name;
    
    
    private Set<TeamDto> teams;
    
}