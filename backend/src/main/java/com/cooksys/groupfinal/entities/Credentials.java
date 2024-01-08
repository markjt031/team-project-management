package com.cooksys.groupfinal.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Credentials {

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

}
