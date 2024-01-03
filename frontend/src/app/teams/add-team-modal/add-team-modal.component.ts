import { Component, EventEmitter, Output } from '@angular/core';
import BasicUser from 'src/app/models/BasicUser';
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
  fullUserList: FullUser[]=[]
  selectedOptions: FullUser[]=[]

  isDropdownOpen = false;

  
  ngOnInit(){
    this.fetchUsers()

  }
  onModalClose(){
    console.log("closing")
    this.close.emit()
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  addUser(user: FullUser) {
    const index = this.selectedOptions.findIndex((option) => option.id === user.id);
    if (index === -1) {
      this.selectedOptions.push(user);
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
      this.fullUserList=users
    })
  }
}
