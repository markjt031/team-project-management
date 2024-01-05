import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Team } from 'src/app/models';
import {Project} from 'src/app/models/Project';
import { EditProjectModalComponent } from '../edit-project-modal/edit-project-modal.component';
import { ProjectService } from 'src/app/services/projectService';

@Component({
  selector: 'app-projects-display',
  templateUrl: './projects-display.component.html',
  styleUrls: ['./projects-display.component.css']
})
export class ProjectsDisplayComponent {

  @Input() team: Team | undefined= undefined
  @ViewChild(EditProjectModalComponent, { static: false }) editProjectModal: EditProjectModalComponent | undefined;

  projects: Project[]=[]
  editModalShown: boolean=false
  projectBeingEdited: Project | undefined = undefined

  constructor(private projectService: ProjectService){}

  ngOnInit(){
    this.projectService.currentProjectsList.subscribe((projects)=>this.projects=projects)
    if (this.team && this.team.id){
      this.projectService.getProjects(this.team?.id)
    }
  }
  toggleEditModal(project?: Project){
    this.projectBeingEdited=project
    console.log(this.projectBeingEdited)
    this.editModalShown=!this.editModalShown
    if (this.editModalShown && this.editProjectModal) {
      this.editModalShown = true;
      this.editProjectModal.initializeFormValues()
      
    }
    this.getProjects();
  }
  getProjects=async()=>{
    if (this.team && this.team.id){
      this.projectService.getProjects(this.team.id)
    }
  }
}


