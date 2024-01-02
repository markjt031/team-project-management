package com.cooksys.groupfinal.mappers;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = { ProfileMapper.class, CredentialsMapper.class })
public interface UserRequestMapper {

}
