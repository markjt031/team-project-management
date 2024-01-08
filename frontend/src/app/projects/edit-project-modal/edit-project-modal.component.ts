import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, Project, Credentials, Team } from 'src/app/models/';
import { fetchData } from 'src/app/services/api';
import { UserService } from 'src/app/user.service';

interface Option{
  value: boolean | undefined,
  label: string
}

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.css']
})

export class EditProjectModalComponent {
  @Output() close= new EventEmitter<void>()

  @Input() project: Project | undefined = undefined
  @Input() team: Team | undefined = undefined

  currentUser: User | undefined = undefined
  
  
  isDropdownOpen: boolean= false
  selectOptions=[
    {value: true, label: 'Yes'},
    {value: false, label: 'No'}
  ]
  selectedOption: Option = {value: undefined, label: "Pick an option"}

  formData: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });
  isError: boolean= false;

  constructor(private userService: UserService){}
  ngOnInit(){
    this.userService.currentUser.subscribe((user)=>{
      this.currentUser=user
    })
    this.initializeFormValues()
  }
  
  initializeFormValues() {
    if (this.project) {
      this.formData.patchValue({
        name: this.project.name,
        description: this.project.description,
      });
    }
  }

  selectOption(option: Option){
    this.selectedOption=option
    this.toggleDropdown()
  }
  toggleDropdown(){
    this.isDropdownOpen=!this.isDropdownOpen
  }

  onModalClose(){
    this.close.emit()
  }
  updateProject=async(project: any, team: Team, projectId: number)=>{
      const token=localStorage.getItem('token')
      if (token){
        let parsedToken=JSON.parse(token)
        const options = {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': parsedToken
          },
          body: JSON.stringify(project),
        };
        try{
          const updatedTeamProject = await fetchData(`teams/${team.id}/projects/${projectId}`, options);
          this.project=updatedTeamProject
        }
        catch (error) {
          console.error('Error updating team:', error);
        } 
      }
      
    }
  onSubmit(){
    if (this.formData.valid && this.selectedOption.value!=undefined && this.currentUser && this.project && this.team && this.project.id){
      this.isError=false
      let project={
        projectDto: {
          name: this.formData.controls['name'].value,
          description: this.formData.controls['description'].value,
          active: this.selectedOption.value,
          team: this.project.team
        }
      }
      console.log(project)
      this.updateProject(project, this.team, this.project.id).then(()=>{
        this.close.emit()
      })
      
    }
    else this.isError=true
  }

  
}
