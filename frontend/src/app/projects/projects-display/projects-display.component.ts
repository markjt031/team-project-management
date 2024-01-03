import { Component, EventEmitter, Input, Output } from '@angular/core';
import Project from 'src/app/models/Project';

@Component({
  selector: 'app-projects-display',
  templateUrl: './projects-display.component.html',
  styleUrls: ['./projects-display.component.css']
})
export class ProjectsDisplayComponent {
  @Input() projects: Project[]=[]
  @Output() updateProjectsList= new EventEmitter<void>()
  
  editModalShown: boolean=false

  toggleEditModal(){
    this.editModalShown=!this.editModalShown
  }
  ngOnInit(){
    console.log(this.projects)
  }
  passUpdateProjectEvent(){
    this.updateProjectsList.emit()
  }
}


