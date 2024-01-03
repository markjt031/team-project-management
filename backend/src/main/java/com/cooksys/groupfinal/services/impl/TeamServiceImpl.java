package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AuthorizationService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;

    private final UserRepository userRepository;

    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;

    private final AuthorizationService authorizationService;

    @Transactional
    @Override
    public TeamDto addUserToTeam(UserTeamRequestDto userTeamRequestDto, Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundException("Team by this ID can't be found."));

        authorizationService.userIsAdmin(userTeamRequestDto.getAdmin());

        // Assuming you have a method to check if the user exists or fetches the user from the database
        User newTeammate = userRepository.findByCredentialsUsernameAndActiveTrue(userTeamRequestDto.getNewTeammate().getCredentials().getUsername())
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (!team.getTeammates().contains(newTeammate)) {
            team.getTeammates().add(newTeammate);
            team = teamRepository.saveAndFlush(team);
        } else {
            throw new BadRequestException("User is already part of the team.");
        }
        return teamMapper.entityToDto(team);
    }

    @Override
    public ProjectDto addNewProjectToTeam(Long teamId, ProjectRequestDto projectRequestDto) {
        Optional<Team> teamToUpdate = teamRepository.findById(teamId);
        if(teamToUpdate.isEmpty()){
            throw new NotFoundException("Team with this ID can't be found.");
        }
        User admin = authorizationService.userIsAdmin(projectRequestDto.getAdmin());
        Project newProject = projectMapper.DtoToEntity(
                projectRequestDto.getProjectDto()
        );
        newProject.setTeam(teamToUpdate.get());
        return projectMapper.entityToDto(projectRepository.saveAndFlush(newProject));
    }

}
