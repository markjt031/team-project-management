package com.cooksys.groupfinal.services;


import com.cooksys.groupfinal.dtos.*;

import java.util.Set;

public interface TeamService {

   public TeamDto addUserToTeam(UserTeamRequestDto userTeamRequestDto, Long teamId);


   ProjectDto addNewProjectToTeam(Long teamId, ProjectRequestDto projectRequestDto);

    Set<FullUserDto> getTeamUsers(Long teamId);


    Set<ProjectDto> getTeamProjects(Long teamId);

    ProjectDto getProjectByTeamId(Long teamId, Long projectId);

    FullUserDto deleteUserByTeam(Long teamId, Long userId);

    ProjectDto updateProjectById(Long teamId, Long projectId, ProjectRequestDto projectRequestDto);

}
