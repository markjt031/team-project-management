package com.cooksys.groupfinal.security.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Profile;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.RequiredArgsConstructor;


public class UserDetailsImpl implements UserDetails{
    private static final long serialVersionUID = 1L;
    private Long id;
    private String username;

    @JsonIgnore
    private String password;
    private Profile profile;

    private Set<Company> companies;
    private Set<Team> teams;
    
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(Long id, String username, String password, Profile profile, Set<Company> companies, Set<Team> teams, Collection<? extends GrantedAuthority> authorities){
        this.id=id;
        this.username=username;
        this.profile=profile;
        this.companies=companies;
        this.teams=teams;
        this.password=password;
        this.authorities=authorities;
    }

    public static UserDetailsImpl build(User user){
        List<GrantedAuthority> authorities=new ArrayList<>();
        if (user.isAdmin()){
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            authorities.add(new SimpleGrantedAuthority("ROLE_WORKER"));
        }
        else authorities.add(new SimpleGrantedAuthority("ROLE_WORKER"));

        return new UserDetailsImpl(
            user.getId(),
            user.getCredentials().getUsername(),
            user.getCredentials().getPassword(),
            user.getProfile(),
            user.getCompanies(),
            user.getTeams(),
            authorities);
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Long getId(){
        return id;
    }
    
    public Profile getProfile(){
        return this.profile;
    }
    public Set<Company> getCompanies(){
        return this.companies;
    }
    public Set<Team> getTeams(){
        return this.teams;
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
       return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
       return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o){
        if (this == o)
            return true;
        if (o == null || getClass()!=o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }

}