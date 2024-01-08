package com.cooksys.groupfinal.services.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.mappers.*;
import com.cooksys.groupfinal.repositories.*;
import com.cooksys.groupfinal.services.AuthorizationService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.services.CompanyService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
	
	private final CompanyRepository companyRepository;
	private final TeamRepository teamRepository;
	private final ProjectRepository projectRepository;
	private final UserRepository userRepository;
	private final AnnouncementRepository announcementRepository;

	private final FullUserMapper fullUserMapper;
	private final AnnouncementMapper announcementMapper;
	private final TeamMapper teamMapper;
	private final ProjectMapper projectMapper;
	private final CompanyMapper companyMapper;
	private final BasicUserMapper userMapper;

	private final AuthorizationService authorizationService;
	
	private Company findCompany(Long id) {
        Optional<Company> company = companyRepository.findById(id);
        if (company.isEmpty()) {
            throw new NotFoundException("A company with the provided id does not exist.");
        }
        return company.get();
    }
	
	private Team findTeam(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        if (team.isEmpty()) {
            throw new NotFoundException("A team with the provided id does not exist.");
        }
        return team.get();
    }
	
	@Override
	public Set<FullUserDto> getAllUsers(Long id) {
		Company company = findCompany(id);
		Set<User> filteredUsers = new HashSet<>();
		company.getEmployees().forEach(filteredUsers::add);
		filteredUsers.removeIf(user -> !user.isActive());
		return fullUserMapper.entitiesToFullUserDtos(filteredUsers);
	}

	@Override
	public Set<AnnouncementResponseDto> getAllAnnouncements(Long id) {
		Company company = findCompany(id);
		List<Announcement> sortedList = new ArrayList<Announcement>(company.getAnnouncements());
		sortedList.sort(Comparator.comparing(Announcement::getDate).reversed());
		Set<Announcement> sortedSet = new HashSet<Announcement>(sortedList);
		return announcementMapper.entitiesToResponseDtos(sortedSet);
	}

	@Override
	public Set<TeamDto> getAllTeams(Long id) {
		Company company = findCompany(id);
		return teamMapper.entitiesToDtos(company.getTeams());
	}

	@Override
	public Set<ProjectDto> getAllProjects(Long companyId, Long teamId) {
		Company company = findCompany(companyId);
		Team team = findTeam(teamId);
		if (!company.getTeams().contains(team)) {
			throw new NotFoundException("A team with id " + teamId + " does not exist at company with id " + companyId + ".");
		}
		Set<Project> filteredProjects = new HashSet<>();
		team.getProjects().forEach(filteredProjects::add);
		filteredProjects.removeIf(project -> !project.isActive());
		return projectMapper.entitiesToDtos(filteredProjects);
	}

	@Override
	@Transactional
	public void deleteCompanyById(Long companyId) {
		
		Company companyToDelete = findCompany(companyId);
		announcementRepository.deleteAnnouncementsByCompanyId(companyId);
		List<Long> teamIds = companyToDelete.getTeams().stream()
				.map(Team::getId)
				.toList();
		teamIds.forEach(teamId -> {
			projectRepository.deleteByTeamId(teamId);
			teamRepository.unlinkAllUsersFromTeam(teamId);
			teamRepository.deleteById(teamId);
		});
		companyRepository.deleteById(companyId);
	}

	@Override
	public Set<CompanyDto> getAllCompanies() {
		List<Company> companies = new ArrayList<>();
		companies.addAll(companyRepository.findAll());
		Set<Company> allCompanies = new HashSet<Company>(companies);
		return companyMapper.entitiesToDtos(allCompanies);
	}

	@Override
	public CompanyDto createCompany(CompanyRequestDto companyRequestDto) {
		if (companyRequestDto==null){
			throw new BadRequestException("The company request is null");
		}
		Company newCompany = companyMapper.requestDtoToEntity(companyRequestDto);
		Company company = companyRepository.saveAndFlush(newCompany);
		return companyMapper.entityToDto(company);
		
	}

	@Override
	public CompanyDto getCompanyById(Long companyId) {
		Company company=findCompany(companyId);
		return companyMapper.entityToDto(company);
	}

	@Override
	public CompanyResponseDto updateCompany(Long companyId, CompanyRequestDto companyRequestDto) {
		if (companyRequestDto==null){
			throw new BadRequestException("Please provide a company to update");
		}
		Company company = findCompany(companyId);
		Company updateCompany = companyMapper.requestDtoToEntity(companyRequestDto);
		
		company.setName(updateCompany.getName());
		company.setDescription(updateCompany.getDescription());
		return companyMapper.entityResponseToDto(companyRepository.saveAndFlush(company));
	}

	@Override
	public CompanyTeamResponseDto createTeam(Long companyId, TeamRequestDto teamRequestDto) {
		if (teamRequestDto.getTeam()==null){
			throw new BadRequestException("Please provide a team to add");
		}
	    Company company = findCompany(companyId);
	    Team newTeam = teamMapper.dtoToEntity(teamRequestDto.getTeam());
	    newTeam.setCompany(company);
		
		for (User teamUser: newTeam.getTeammates() ){
			System.out.println(teamUser.getProfile());
			userRepository.findById(teamUser.getId())
			.orElseThrow(()->new NotFoundException("User not found"));
		}
	    teamRepository.saveAndFlush(newTeam);
	    
	    CompanyTeamResponseDto responseDto = new CompanyTeamResponseDto();
	    responseDto.setId(newTeam.getId());
	    responseDto.setName(newTeam.getName());
		responseDto.setDescription(newTeam.getDescription());
		responseDto.setTeammates(userMapper.entitiesToBasicUserDtos(newTeam.getTeammates()));
	    
	    return responseDto;
	}

	@Override
	public TeamDto updateTeam(Long companyId, Long teamId, TeamRequestDto teamRequestDto) {
		Company company = findCompany(companyId);
		Team team = findTeam(teamId);
		Team newTeam = teamMapper.requestToEntityDto(teamRequestDto);
		
		if (!company.getTeams().contains(team)) {
			throw new NotFoundException("A team with id " + teamId + " does not exist at company with id " + companyId + ".");
		}
		
		team.setName(newTeam.getName());
		team.setDescription(newTeam.getDescription());

		for (User teamUser: newTeam.getTeammates() ){
			System.out.println(teamUser.getProfile());
			userRepository.findById(teamUser.getId())
			.orElseThrow(()->new NotFoundException("User not found"));
		}

		teamRepository.saveAndFlush(team);
		
		return teamMapper.entityToDto(team);
		
	}

	@Override
	public CompanyTeamResponseDto deleteTeam(Long companyId, Long teamId) {
		Company company = findCompany(companyId);
		Team team = findTeam(teamId);

		if (!company.getTeams().contains(team)) {
			throw new NotFoundException("A team with id " + teamId + " does not exist at company with id " + companyId + ".");
		}
		
		teamRepository.deleteById(teamId);
		return companyMapper.entityTeamResponseDto(company);
	}

	@Override
	@Transactional
	public FullUserDto addUserToCompany(Long companyId, UserCompanyRequestDto userCompanyRequestDto) {
		if (userCompanyRequestDto==null || userCompanyRequestDto.getNewEmployeeId()==null){
			throw new BadRequestException("Please provide credentials and a user to add");
		}
		// Find the company using the provided ID
		Company company = findCompany(companyId);
		Long employeeId = userCompanyRequestDto.getNewEmployeeId();
		Optional<User> newEmployee = userRepository.findById(employeeId);
		if(newEmployee.isEmpty()){throw new NotFoundException("Employee with this id not found.");}
		// Check if the user is already part of the company
		if (company.getEmployees().contains(newEmployee.get())) { //This needs modification to find the user based on Id.
			throw new BadRequestException("User already part of the company.");
		}


		company.getEmployees().add(newEmployee.get());
		companyRepository.saveAndFlush(company);
		Optional<User> addedEmployee = userRepository.findById(employeeId);
		return fullUserMapper.entityToFullUserDto(addedEmployee.get());
	}





}
