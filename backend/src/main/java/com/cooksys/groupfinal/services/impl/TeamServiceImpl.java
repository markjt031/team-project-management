package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Project;

import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AuthorizationService;
import com.cooksys.groupfinal.services.TeamService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;

    private final UserRepository userRepository;


    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;

    private final FullUserMapper fullUserMapper;


    private final AuthorizationService authorizationService;

    @Override
    public Set<FullUserDto> getTeamUsers(Long teamId) {
        return teamRepository.findById(teamId)
                .map(team -> team.getTeammates().stream()
                        .map(fullUserMapper::entityToFullUserDto)
                        .collect(Collectors.toSet()))
                .orElse(Collections.emptySet());
    }

    @Override
    public Set<ProjectDto> getTeamProjects(Long teamId) {
        return teamRepository.findById(teamId)
                .map(team -> projectMapper.entitiesToDtos(team.getProjects()))
                .orElse(Collections.emptySet());
    }

    @Override
    public ProjectDto getProjectByTeamId(Long teamId, Long projectId) {
        Optional<Team> teamOptional = teamRepository.findById(teamId);
        if (teamOptional.isPresent()) {
            Team team = teamOptional.get();
            for (Project project : team.getProjects()) {
                if (project.getId().equals(projectId)) {
                    return projectMapper.entityToDto(project);
                }
            }
        }
        return null;
    }

    @Override
    public FullUserDto deleteUserByTeam(Long teamId, Long userId) {
        Optional<Team> teamOptional = teamRepository.findById(teamId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (teamOptional.isPresent() && userOptional.isPresent()) {
            Team team = teamOptional.get();
            User user = userOptional.get();

            team.getTeammates().remove(user);
            teamRepository.saveAndFlush(team);

            user.getTeams().remove(team);
            userRepository.saveAndFlush(user);

            return fullUserMapper.entityToFullUserDto(user);
        }
        return null;
    }

    @Override
    public ProjectDto updateProjectById(Long teamId, Long projectId, ProjectRequestDto projectRequestDto) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundException("Team with ID " + teamId + " not found."));

        Project projectToUpdate = team.getProjects().stream()
                .filter(project -> project.getId().equals(projectId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Project with ID " + projectId + " not found in team " + teamId));

        authorizationService.userIsAdmin(projectRequestDto.getAdmin());

        // Update project details here
        ProjectDto projectDto = projectRequestDto.getProjectDto();
        if (projectDto.getName() != null) {
            projectToUpdate.setName(projectDto.getName());
        }
        if (projectDto.getDescription() != null) {
            projectToUpdate.setDescription(projectDto.getDescription());
        }
        projectToUpdate.setActive(projectDto.isActive());

        projectRepository.saveAndFlush(projectToUpdate);

        return projectMapper.entityToDto(projectToUpdate);
    }


    @Override
    public ProjectDto deleteProjectByTeam(Long teamId, Long projectId) {
        Optional<Team> teamOptional = teamRepository.findById(teamId);

        if (teamOptional.isPresent()) {
            Team team = teamOptional.get();
            Optional<Project> projectOptional = team.getProjects().stream()
                    .filter(project -> project.getId().equals(projectId))
                    .findFirst();

            if (projectOptional.isPresent()) {
                Project projectToRemove = projectOptional.get();
                team.getProjects().remove(projectToRemove);
                teamRepository.saveAndFlush(team);

                projectRepository.deleteById(projectId);

                return projectMapper.entityToDto(projectToRemove);
            }
        }
        return null;
    }

    @Transactional
    @Override
    public TeamDto addUserToTeam(UserTeamRequestDto userTeamRequestDto, Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundException("Team by this ID can't be found."));

        authorizationService.userIsAdmin(userTeamRequestDto.getAdmin());

        // Assuming you have a method to check if the user exists or fetches the user from the database
        User newTeammate = userRepository.findById(userTeamRequestDto.getNewTeammate().getId())
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
        authorizationService.userIsAdmin(projectRequestDto.getAdmin());
        Project newProject = projectMapper.DtoToEntity(
                projectRequestDto.getProjectDto()
        );
        newProject.setTeam(teamToUpdate.get());
        return projectMapper.entityToDto(projectRepository.saveAndFlush(newProject));
    }

}
