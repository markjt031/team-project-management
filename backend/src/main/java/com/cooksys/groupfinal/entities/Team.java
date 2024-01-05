package com.cooksys.groupfinal.entities;

import java.util.HashSet;
import java.util.Set;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
public class Team {
	
	@Id
	@GeneratedValue
	private Long id;
	
	private String name;
	
	private String description;
	
	@ManyToOne
	private Company company;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@EqualsAndHashCode.Exclude
	private Set<User> teammates = new HashSet<>();
	
	@OneToMany(mappedBy = "team",cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
	@EqualsAndHashCode.Exclude
	private Set<Project> projects = new HashSet<>();

}
