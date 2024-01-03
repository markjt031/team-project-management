package com.cooksys.groupfinal.controllers;

import java.util.List;
import java.util.Set;

import com.cooksys.groupfinal.dtos.*;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.CompanyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
public class CompanyController {
	
	private final CompanyService companyService;
	
	@GetMapping("/{id}/users")
    @CrossOrigin(origins="*")
    public Set<FullUserDto> getAllUsers(@PathVariable Long id) {
        return companyService.getAllUsers(id);
    }
	
	@GetMapping("/{id}/announcements")
    @CrossOrigin(origins="*")
    public Set<AnnouncementDto> getAllAnnouncements(@PathVariable Long id) {
        return companyService.getAllAnnouncements(id);
    }
	
	@GetMapping("/{id}/teams")
    @CrossOrigin(origins="*")
    public Set<TeamDto> getAllTeams(@PathVariable Long id) {
        return companyService.getAllTeams(id);
    }
	
	@GetMapping("/{companyId}/teams/{teamId}/projects")
    @CrossOrigin(origins="*")
	public Set<ProjectDto> getAllProjects(@PathVariable Long companyId, @PathVariable Long teamId) {
		return companyService.getAllProjects(companyId, teamId);
	}

    @DeleteMapping("/{companyId}")
    @CrossOrigin(origins="*")
    public void deleteCompanyById(@PathVariable Long companyId, @RequestBody UserRequestDto userRequestDto){
       companyService.deleteCompanyById(companyId, userRequestDto);
    }
    
    @GetMapping
    @CrossOrigin(origins = "*")
    public Set<CompanyDto> getAllCompanies(){
    	return companyService.getAllCompanies();
    }

    @PostMapping
    @CrossOrigin(origins="*")
    public CompanyDto createCompany(@RequestBody CompanyRequestDto companyRequestDto) {
    	return companyService.createCompany(companyRequestDto);
    }
    
    @GetMapping("/{companyId}")
    @CrossOrigin(origins = "*")
    public CompanyDto getCompanyById(@PathVariable Long companyId) {
    	return companyService.getCompanyById(companyId);
    }
    
    @PutMapping("/{companyId}")
    @CrossOrigin(origins = "*")
    public CompanyResponseDto updateCompany(@PathVariable Long companyId, @RequestBody CompanyRequestDto companyRequestDto) {
    	return companyService.updateCompany(companyId, companyRequestDto);
    }
    
    @PostMapping("/{companyId}/teams")
    @CrossOrigin(origins = "*")
    public CompanyTeamResponseDto createTeam(@PathVariable Long companyId, @RequestBody TeamRequestDto teamRequestDto) {
    	return companyService.createTeam(companyId, teamRequestDto);
    }
    
    @PutMapping("/{companyId}/teams/{teamId}")
    @CrossOrigin(origins = "*")
    public CompanyTeamResponseDto updateTeam(@PathVariable Long companyId, @PathVariable Long teamId, @RequestBody TeamRequestDto teamRequestDto) {
    	return companyService.updateTeam(companyId, teamId, teamRequestDto);
    }
}
