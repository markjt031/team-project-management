import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';;
import { fetchData } from 'src/app/services/api';
import { UserService } from 'src/app/user.service';
import { User, Credentials, Team, Project} from '../../models'

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.css']
})
export class AddProjectModalComponent {
  @Output() close= new EventEmitter<void>()
  @Output() updateProjectsList= new EventEmitter<void>()
  @Input() team: Team | undefined = undefined

  currentUser: User | undefined = undefined
  credentials: Credentials | undefined = undefined

  formData: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });

  isError: boolean = false
  constructor(private userService: UserService, private router: Router){}
  ngOnInit(){
    this.userService.currentUser.subscribe((user: User)=>{
      this.currentUser=user
    })
    const credentials = localStorage.getItem('credentials')
    if (credentials){
      this.credentials=(JSON.parse(credentials))
    }
  }
  onModalClose(){
    this.close.emit()
  }
  postProject=async(project: any)=>{
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    };
    try{
      const createdProject = await fetchData(`teams/${this.team?.id}/projects`, options);
    }
    catch (error) {
      console.error('Error creating team:', error);
    } 
  }
  onSubmit(){
    if (this.formData.valid && this.currentUser){
      this.isError=false
      let project={
        projectDto: {
          name: this.formData.controls['name'].value,
          description: this.formData.controls['description'].value,
          active: true,
          team: this.team
        },
        admin: {
          credentials: this.credentials,
          profile: this.currentUser.profile,
          admin: this.currentUser.admin
        }
      }
      console.log(project)
      
      //add code to submit project to api
      this.postProject(project).then(()=>{
        this.updateProjectsList.emit()
        this.close.emit()
      })
    }
    else {
      this.isError=true
    }
  }
}
