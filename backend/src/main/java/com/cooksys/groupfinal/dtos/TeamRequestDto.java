package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TeamRequestDto {
    
    private String name;
    
    private String description;
    
    private UserRequestDto validation; 
}
