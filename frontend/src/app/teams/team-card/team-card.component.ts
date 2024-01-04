import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, Project, Team } from 'src/app/models';
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
companyId: number | undefined= undefined
projects: Project[]=[]
currentUser: User | undefined = undefined


constructor(private router: Router, private userService: UserService){}
ngOnInit(){
  this.userService.currentUser.subscribe((user: User)=>{
    this.currentUser=user
    //assuming non-admins only have one company
    if (!user.admin){
      this.companyId=this.currentUser.companies[0].id
    }
    else{
      //set companyID from companyService
      //temporarily setting this manually for now. 
      this.companyId=this.currentUser.companies[0].id
    }
  })
  this.getProjects()
}

getProjects=async()=>{
  let response = await fetchData(`company/${this.companyId}/teams/${this.team.id}/projects`)
    .then((projects)=>{
      this.projects=projects
      this.numberOfProjects=this.projects.length
    })
} 
navigateToProjects(){
  this.router.navigate(['teams', this.team.id, 'projects'], {
    state: {
      projects: this.projects,
      team: this.team,
      companyId: this.companyId,
      name: this.team.name
    }
  })
}
}
