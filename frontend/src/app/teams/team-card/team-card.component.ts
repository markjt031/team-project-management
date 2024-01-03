import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Project from 'src/app/models/Project';
import Team from 'src/app/models/Team';
import { fetchData } from 'src/app/services/api';

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
companyId: number = 1
projects: Project[]=[]



constructor(private router: Router){}
ngOnInit(){
  this.getProjects()
}

getProjects=async()=>{
  console.log(`company/${this.companyId}/teams/${this.team.id}/projects`)
  let response = await fetchData(`company/${this.companyId}/teams/${this.team.id}/projects`)
    .then((projects)=>{
      this.projects=projects
      this.numberOfProjects=this.projects.length
    })
} 
navigateToProjects(){
  this.router.navigate(['teams', this.team.id, 'projects', {projects: this.projects}])
}
}
