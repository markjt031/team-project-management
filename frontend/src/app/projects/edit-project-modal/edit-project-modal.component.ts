import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Project from 'src/app/models/Project';

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

  ngOnInit(){
    this.formData.setValue({name: this.project?.name, description: this.project?.description })
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

  onSubmit(){
    if (this.formData.valid && this.selectedOption.value!=undefined){
      this.isError=false
      let project={
        name: this.formData.controls['name'].value,
        description: this.formData.controls['description'].value,
        active: this.selectedOption.value
      }
      console.log(project)
      this.close.emit()
      //add code to submit project to api
    }
    else this.isError=true
  }

  
}
