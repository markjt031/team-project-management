import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import FullUser from 'src/app/models/FullUser';
import { fetchData } from 'src/app/services/api';

@Component({
  selector: 'app-add-team-modal',
  templateUrl: './add-team-modal.component.html',
  styleUrls: ['./add-team-modal.component.css']
})
export class AddTeamModalComponent {
  @Output() close= new EventEmitter<void>()
  companyId: number = 1
  availableUserList: FullUser[]=[]
  selectedOptions: FullUser[]=[]
  
  isError: boolean=false
  isDropdownOpen: boolean = false;

  formData: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });

  constructor(private router: Router){}
  ngOnInit(){
    this.fetchUsers()

  }
  onModalClose(){
    console.log("closing")
    this.selectedOptions=[]
    this.close.emit()
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  addUser(user: FullUser) {
    const index = this.selectedOptions.findIndex((option) => option.id === user.id);
    const optionIndex=this.availableUserList.findIndex((option)=>option.id===user.id)
    if (index === -1) {
      this.selectedOptions.push(user);
      this.availableUserList.splice(optionIndex, 1)
    }
    this.toggleDropdown() 
  }

  removeUser(user: FullUser){
    const index=this.selectedOptions.findIndex((option) => option.id === user.id);
    this.selectedOptions.splice(index, 1)
  }

  //this can be moved to a service
  fetchUsers=async()=>{
    let response=await fetchData(`company/${this.companyId}/users`)
    .then((users)=>{
      console.log(users)
      this.availableUserList=users
    })
  }

  onSubmit(){
    if (this.formData.valid){
      this.isError=false
      let team={
        name: this.formData.controls['name'].value,
        description: this.formData.controls['description'].value,
        teammates: [...this.selectedOptions]
      }
      console.log(team)
      //add code to submit team once the create path exists

      //redirect to same page and reload to reflect changes. may not be necessary
      this.router.navigateByUrl('teams')
        .then(() => {
          window.location.reload();
      });
    }
    else{
      this.isError=true;
    }
  }
}
