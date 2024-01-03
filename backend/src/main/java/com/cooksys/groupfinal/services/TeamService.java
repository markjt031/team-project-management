package com.cooksys.groupfinal.services;


import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;

import com.cooksys.groupfinal.dtos.FullUserDto;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.UserTeamRequestDto;

import java.util.Set;

public interface TeamService {

   public TeamDto addUserToTeam(UserTeamRequestDto userTeamRequestDto, Long teamId);


   ProjectDto addNewProjectToTeam(Long teamId, ProjectRequestDto projectRequestDto);

    Set<FullUserDto> getTeamUsers(Long teamId);


    Set<ProjectDto> getTeamProjects(Long teamId);
}
