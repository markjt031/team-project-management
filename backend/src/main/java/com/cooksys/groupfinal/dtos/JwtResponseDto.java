package com.cooksys.groupfinal.dtos;

import java.util.List;
import java.util.Set;


public class JwtResponseDto {
        private String token;
        private String type = "Bearer";
        private Long id;
        private String username;
        private ProfileDto profile;
        private Set<CompanyDto> companies;
        private Set<TeamDto> teams;
        private List<String> roles;
      
        public JwtResponseDto(String accessToken, Long id, String username, ProfileDto profile, Set<CompanyDto> companies, Set<TeamDto> teams, List<String> roles) {
          this.token = accessToken;
          this.id = id;
          this.username = username;
          this.profile=profile;
          this.companies=companies;
          this.teams=teams;
          this.roles = roles;
        }
      
        public String getAccessToken() {
          return token;
        }
      
        public void setAccessToken(String accessToken) {
          this.token = accessToken;
        }
      
        public String getTokenType() {
          return type;
        }
      
        public void setTokenType(String tokenType) {
          this.type = tokenType;
        }
      
        public Long getId() {
          return id;
        }
      
        public void setId(Long id) {
          this.id = id;
        }
      
        public String getUsername() {
          return username;
        }
      
        public void setUsername(String username) {
          this.username = username;
        }
      
        public List<String> getRoles() {
          return roles;
        }
      
        public ProfileDto getProfile(){
            return this.profile;
        }

        public void setProfile(ProfileDto profile){
            this.profile=profile;
        }

        public Set<TeamDto> getTeams(){
            return this.teams;
        }

        public void setTeams(Set<TeamDto> teams){
            this.teams=teams;
        }

        public Set<CompanyDto> getCompanies(){
            return this.companies;
        }
        public void setCompanies(Set<CompanyDto> companies){
            this.companies=companies;
        }
}
