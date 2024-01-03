package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.UserTeamRequestDto;

public interface TeamService {

   public TeamDto addUserToTeam(UserTeamRequestDto userTeamRequestDto, Long teamId);

}
