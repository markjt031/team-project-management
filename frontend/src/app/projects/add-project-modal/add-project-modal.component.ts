import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Team from 'src/app/models/Team';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.css']
})
export class AddProjectModalComponent {
  @Output() close= new EventEmitter<void>()
  @Input() team: Team | undefined = undefined

  formData: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });

  isError: boolean = false
  onModalClose(){
    this.close.emit()
  }
  onSubmit(){
    if (this.formData.valid){
      this.isError=false
      let project={
        name: this.formData.controls['name'].value,
        description: this.formData.controls['description'].value,
        active: true,
        team: this.team
      }
      console.log(project)
      this.close.emit()
      //add code to submit project to api
    }
    else {
      this.isError=true
    }
  }
}
