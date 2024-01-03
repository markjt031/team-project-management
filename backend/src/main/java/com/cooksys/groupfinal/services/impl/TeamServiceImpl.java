package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.UserTeamRequestDto;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AuthorizationService;
import com.cooksys.groupfinal.services.TeamService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;
    private final UserRepository userRepository;
    private final BasicUserMapper userMapper;
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

}
