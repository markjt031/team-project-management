package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.UserTeamRequestDto;

import java.util.Set;

public interface TeamService {

   public TeamDto addUserToTeam(UserTeamRequestDto userTeamRequestDto, Long teamId);

    Set<FullUserDto> getTeamUsers(Long teamId);
}
