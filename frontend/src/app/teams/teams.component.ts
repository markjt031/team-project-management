import {  Component } from '@angular/core';
import { User, Team, Company } from '../models/';
import { UserService } from '../user.service';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
import { TeamService } from '../services/teamsService';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  //company id should be based on the company from the use that is logged in.
  //will be pulled from UserService when implemented
  company: Company | undefined = undefined
  teams: Team[] = []
  showModal: boolean = false
  currentUser: User | undefined = undefined

  constructor(private router: Router, private userService: UserService, private companyService: CompanyService, private teamService: TeamService){}
  ngOnInit(){
    this.userService.currentUser.subscribe((user: User)=>{
      this.currentUser=user
      if (this.currentUser.id===-1){
        this.router.navigateByUrl('login')
      }
    })
    this.companyService.currentCompany.subscribe((company)=>this.company=company)
    if (this.company){
      this.teamService.fetchTeams(this.company.id, this.currentUser).subscribe((teams) => {
        this.teamService.updateTeam(teams)
      })
    }
    this.teamService.currentTeamList.subscribe((teams)=>{
      this.teams=teams
      
    })
  }
    toggleCreateModal(){
      this.showModal=!this.showModal
      console.log(this.showModal)
    }
    closeModal(){
      console.log("closing again")
      this.showModal=false
    }
}
