import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Project from '../models/Project';
import { LocationStrategy } from '@angular/common';
import Team from '../models/Team';
import { fetchData } from '../services/api';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  id: number = 0
  projects: Project[]=[]
  name: string | null=''
  team: any
  companyId: number = 0
  addModalShown= false

  constructor(private route: ActivatedRoute, private location: LocationStrategy){}
  ngOnInit(){
    const state= this.location.getState()
    if (state && typeof state=== 'object'){
      if ('name' in state && typeof state.name==='string'){
        this.name=state.name
      }
      if ('projects' in state && state.projects instanceof Array){
        this.projects=state.projects
      }
      if ('team' in state && typeof state.team==='object'){
        this.team=state.team
      }
      if ('companyId' in state && typeof state.companyId==='number'){
        this.companyId=state.companyId
      }
    }
    this.route.queryParams.subscribe(params => {
      this.id = this.route.snapshot.params['id']
      
    })
  }
  toggleModal(){
    this.addModalShown=!this.addModalShown
  }
  getProjects=async()=>{
    console.log(`company/${this.companyId}/teams/${this.team.id}/projects`)
    let response = await fetchData(`company/${this.companyId}/teams/${this.team.id}/projects`)
      .then((projects)=>{
        this.projects=projects
      })
  }
}
