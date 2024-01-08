package com.cooksys.groupfinal.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_table")
@NoArgsConstructor
@Data
public class User {
	
	@Id
	@GeneratedValue
	private Long id;

  @Embedded
  private Credentials credentials;
	
  @Embedded
  private Profile profile;
	
	private boolean active;
	
	private boolean admin;
	
	private String status = "PENDING";

	public User(Credentials credentials, Profile profile, boolean active, boolean admin){
		this.credentials=credentials;
		this.profile=profile;
		this.active=active;
		this.admin=admin;
	}
	
	@OneToMany(mappedBy = "author")
	@EqualsAndHashCode.Exclude
	private Set<Announcement> announcements = new HashSet<>();
	
	@ManyToMany(mappedBy = "employees")
	@EqualsAndHashCode.Exclude
	private Set<Company> companies = new HashSet<>();
	
	@ManyToMany(fetch = FetchType.EAGER,mappedBy = "teammates")
	@EqualsAndHashCode.Exclude
	private Set<Team> teams = new HashSet<>();

}
