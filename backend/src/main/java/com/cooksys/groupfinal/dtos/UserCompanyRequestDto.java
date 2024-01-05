package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UserCompanyRequestDto {

    private UserRequestDto admin;
    private Long newEmployeeId;
}