import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Project from '../models/Project';
import { LocationStrategy } from '@angular/common';
import Team from '../models/Team';

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
    }
    this.route.queryParams.subscribe(params => {
      this.id = this.route.snapshot.params['id']
      
    })
  }
  toggleModal(){
    this.addModalShown=!this.addModalShown
  }
}
