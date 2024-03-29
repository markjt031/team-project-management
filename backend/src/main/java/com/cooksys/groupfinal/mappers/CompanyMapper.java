package com.cooksys.groupfinal.mappers;

import java.util.Set;

import org.mapstruct.Mapper;
import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.CompanyRequestDto;
import com.cooksys.groupfinal.dtos.CompanyResponseDto;
import com.cooksys.groupfinal.dtos.CompanyTeamResponseDto;
import com.cooksys.groupfinal.entities.Company;

@Mapper(componentModel = "spring", uses = { TeamMapper.class, BasicUserMapper.class })
public interface CompanyMapper {
	
	CompanyDto entityToDto(Company company);

  Set<CompanyDto> entitiesToDtos(Set<Company> companies);
  
  Company requestDtoToEntity(CompanyRequestDto companyRequestDto);
  
  CompanyResponseDto entityResponseToDto(Company company);
  
  CompanyTeamResponseDto entityTeamResponseDto(Company company);
  

}
