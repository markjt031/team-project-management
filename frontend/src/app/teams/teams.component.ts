import { ChangeDetectorRef, Component } from '@angular/core';
import Team from '../models/Team';
import { fetchData } from '../services/api';
import { User } from '../models/User';
import { UserService } from '../user.service';
import BasicUser from '../models/BasicUser';
import { CompanySelectComponent } from '../company-select/company-select.component';
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
  companyId: number | undefined = undefined
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
    
    //assuming non-admins only have one company
    if (!this.currentUser?.admin){
      this.companyId=this.currentUser?.companies[0]?.id
    }
    else{
      //this doesn't work yet because the company select isn't fully implemented yet
      //it is meant to set the company id to the current selected company for admins
    //  this.companyService.currentCompany.subscribe((company)=>this.companyId=company.id)
      this.companyId=this.currentUser.companies[0].id
    }
    this.teamService.fetchTeams(this.companyId, this.currentUser).subscribe((teams) => {
      this.teamService.updateTeam(teams)
    })
    // this.teamService.fetchTeams(this.companyId, this.currentUser)
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
      this.showModal=false;
    }
}
