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
public class Profile {

    private String firstName;

    private String lastName;

    @Column(nullable = false)
    private String email;

    private String phone;

    public Profile(String firstName, String lastName, String email){
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
    }
}
