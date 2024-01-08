package com.cooksys.groupfinal.controllers;

import java.util.Set;

import com.cooksys.groupfinal.dtos.*;

import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WORKER')")
    public Set<FullUserDto> getAllUsers(@PathVariable Long id) {
        return companyService.getAllUsers(id);
    }
	
	@GetMapping("/{id}/announcements")
    @CrossOrigin(origins="*")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WORKER')")
    public Set<AnnouncementResponseDto> getAllAnnouncements(@PathVariable Long id) {
        return companyService.getAllAnnouncements(id);
    }
	
	@GetMapping("/{id}/teams")
   @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WORKER')")
    @CrossOrigin(origins="*")
    public Set<TeamDto> getAllTeams(@PathVariable Long id) {
        return companyService.getAllTeams(id);
    }
	
	@GetMapping("/{companyId}/teams/{teamId}/projects")
    @CrossOrigin(origins="*")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WORKER')")
	public Set<ProjectDto> getAllProjects(@PathVariable Long companyId, @PathVariable Long teamId) {
		return companyService.getAllProjects(companyId, teamId);
	}

    @DeleteMapping("/{companyId}")
    @CrossOrigin(origins="*")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteCompanyById(@PathVariable Long companyId){
       companyService.deleteCompanyById(companyId);
    }
    
    @GetMapping
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WORKER')")
    public Set<CompanyDto> getAllCompanies(){
    	return companyService.getAllCompanies();
    }

    @PostMapping
    @CrossOrigin(origins="*")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public CompanyDto createCompany(@RequestBody CompanyRequestDto companyRequestDto) {
    	return companyService.createCompany(companyRequestDto);
    }
    
    @GetMapping("/{companyId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WORKER')")
    @CrossOrigin(origins = "*")
    public CompanyDto getCompanyById(@PathVariable Long companyId) {
    	return companyService.getCompanyById(companyId);
    }
    
    @PutMapping("/{companyId}")
    @CrossOrigin(origins = "*")
     @PreAuthorize("hasRole('ROLE_ADMIN')")
    public CompanyResponseDto updateCompany(@PathVariable Long companyId, @RequestBody CompanyRequestDto companyRequestDto) {
    	return companyService.updateCompany(companyId, companyRequestDto);
    }
    
    @PostMapping("/{companyId}/teams")
    @CrossOrigin(origins = "*")
     @PreAuthorize("hasRole('ROLE_ADMIN')")
    public CompanyTeamResponseDto createTeam(@PathVariable Long companyId, @RequestBody TeamRequestDto teamDto) {
    	return companyService.createTeam(companyId, teamDto);
    }
    
    @PutMapping("/{companyId}/teams/{teamId}")
    @CrossOrigin(origins = "*")
     @PreAuthorize("hasRole('ROLE_ADMIN')")
    public TeamDto updateTeam(@PathVariable Long companyId, @PathVariable Long teamId, @RequestBody TeamRequestDto teamRequestDto) {
    	return companyService.updateTeam(companyId, teamId, teamRequestDto);
    }
    
    @DeleteMapping("{companyId}/teams/{teamId}")
    @CrossOrigin(origins = "*")
     @PreAuthorize("hasRole('ROLE_ADMIN')")
    public CompanyTeamResponseDto deleteTeam(@PathVariable Long companyId, @PathVariable Long teamId) {
    	return companyService.deleteTeam(companyId, teamId);
    }

    @PostMapping("/{companyId}/users")
    @CrossOrigin(origins="*")
     @PreAuthorize("hasRole('ROLE_ADMIN')")
    public FullUserDto addUserToCompany(@PathVariable Long companyId, @RequestBody UserCompanyRequestDto userCompanyRequestDto) {
        return companyService.addUserToCompany(companyId, userCompanyRequestDto);
    }


}
