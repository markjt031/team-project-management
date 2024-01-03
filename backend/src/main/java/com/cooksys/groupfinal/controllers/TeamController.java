package com.cooksys.groupfinal.controllers;


import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;
import com.cooksys.groupfinal.dtos.FullUserDto;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.UserTeamRequestDto;
import com.cooksys.groupfinal.services.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/teams")
@RequiredArgsConstructor
public class TeamController {
	
	private final TeamService teamService;

	@GetMapping("/{teamId}/users")
	public Set<FullUserDto> getTeamUsers(@PathVariable Long teamId) {
		return teamService.getTeamUsers(teamId);
	}

	@GetMapping("/{teamId}/projects")
	public Set<ProjectDto> getTeamProjects(@PathVariable Long teamId) {
		return teamService.getTeamProjects(teamId);
	}

	@PostMapping("/{teamId}/users")
	public TeamDto addUserToTeam(@PathVariable Long teamId, @RequestBody UserTeamRequestDto userTeamRequestDto){
		return teamService.addUserToTeam(userTeamRequestDto, teamId);
	}

	@PostMapping("/{teamId}/projects")
	public ProjectDto addNewProjectToTeam(@PathVariable Long teamId, @RequestBody ProjectRequestDto projectRequestDto){
		return teamService.addNewProjectToTeam(teamId, projectRequestDto);
	}

}
