package com.cooksys.groupfinal.controllers;


import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.services.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/teams")
@RequiredArgsConstructor
public class TeamController {
	
	private final TeamService teamService;

	@GetMapping("/{teamId}/users")
	public Set<FullUserDto> getTeamUsers(@PathVariable Long teamId) {
		return teamService.getTeamUsers(teamId);
	}

	@GetMapping("/{teamId}")
	public TeamDto getTeam(@PathVariable Long teamId){
		return teamService.getTeam(teamId);
	}

	@GetMapping("/{teamId}/projects")
	public Set<ProjectDto> getTeamProjects(@PathVariable Long teamId) {
		return teamService.getTeamProjects(teamId);
	}

	@GetMapping("/{teamId}/projects/{projectId}")
	public ProjectDto getProjectByTeamId(@PathVariable Long teamId, @PathVariable Long projectId) {
		return teamService.getProjectByTeamId(teamId, projectId);
	}

	@PutMapping("/{teamId}/projects/{projectId}")
	public ProjectDto updateProjectById(@PathVariable Long teamId, @PathVariable Long projectId, @RequestBody ProjectRequestDto projectRequestDto){
		return teamService.updateProjectById(teamId, projectId, projectRequestDto);
	}

	@DeleteMapping("/{teamId}/users/{userId}")
	public FullUserDto deleteUserByTeam(@PathVariable Long teamId, @PathVariable Long userId) {
		return teamService.deleteUserByTeam(teamId, userId);
	}

	@DeleteMapping("/{teamId}/projects/{projectId}")
	public ProjectDto deleteProjectByTeam(@PathVariable Long teamId, @PathVariable Long projectId) {
		return teamService.deleteProjectByTeam(teamId, projectId);
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
