import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/company.service';
import { User, Project, Team, Company } from 'src/app/models';
import { fetchData } from 'src/app/services/api';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent {
@Input() team: Team={
  id: 0,
  name: "",
  description: "",
  teammates: []
}
numberOfProjects: number=0
company: Company | undefined= undefined
projects: Project[]=[]
currentUser: User | undefined = undefined


constructor(private router: Router, private userService: UserService, private companyService: CompanyService){}
ngOnInit(){
  this.userService.currentUser.subscribe((user: User)=>{
    this.currentUser=user
    //assuming non-admins only have one company
    if (!user.admin){
      this.company=this.currentUser.companies[0]
    }
    else{
      //set companyID from companyService
      //temporarily setting this manually for now. 
      this.companyService.currentCompany.subscribe((company)=>this.company=company)
    }
  })
  this.getProjects()
}

getProjects=async()=>{
  if (this.company){
  let response = await fetchData(`company/${this.company.id}/teams/${this.team.id}/projects`)
    .then((projects)=>{
      this.projects=projects
      this.numberOfProjects=this.projects.length
    })
  }
} 
navigateToProjects(){
  if (this.company){
    this.router.navigate(['teams', this.team.id, 'projects'], {
      state: {
        projects: this.projects,
        team: this.team,
        companyId: this.company.id,
        name: this.team.name
      }
    })
  }
}
}
