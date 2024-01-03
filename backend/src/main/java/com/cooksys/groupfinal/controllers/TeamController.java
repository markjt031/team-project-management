package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.UserTeamRequestDto;
import com.cooksys.groupfinal.entities.Team;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RestController
@RequestMapping("/teams")
@RequiredArgsConstructor
public class TeamController {
	
	private final TeamService teamService;

	@PostMapping("/{teamId}/users")
	public TeamDto addUserToTeam(@PathVariable Long teamId, @RequestBody UserTeamRequestDto userTeamRequestDto){
		return teamService.addUserToTeam(userTeamRequestDto, teamId);
	}

	@PostMapping("/{teamId}/projects")
	public ProjectDto addNewProjectToTeam(@PathVariable Long teamId, @RequestBody ProjectRequestDto projectRequestDto){
		return teamService.addNewProjectToTeam(teamId, projectRequestDto);
	}

}
