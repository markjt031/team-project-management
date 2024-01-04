import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/company.service';
import { User, Credentials, Company, BasicUser } from 'src/app/models/';
import { fetchData } from 'src/app/services/api';
import { TeamService } from 'src/app/services/teamsService';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-team-modal',
  templateUrl: './add-team-modal.component.html',
  styleUrls: ['./add-team-modal.component.css']
})
export class AddTeamModalComponent {
  @Output() close= new EventEmitter<void>()
  @Output() submitting= new EventEmitter<void>()

  company: Company | undefined = undefined
  availableUserList: BasicUser[]=[]
  selectedOptions: BasicUser[]=[]
  
  isError: boolean=false
  isDropdownOpen: boolean = false
  currentUser: User | undefined = undefined
  credentials: Credentials | undefined = undefined

  formData: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });


  constructor(
    private router: Router,
    private userService: UserService, 
    private teamService: TeamService,
    private companyService: CompanyService){}

  ngOnInit(){
    this.userService.currentUser.subscribe((user: User)=>{
      this.currentUser=user
    })
    this.userService.currentUserCredentials.subscribe((credentials : Credentials)=>{
      this.credentials=credentials
    })
    this.companyService.currentCompany.subscribe((company)=>{
      this.company=company
    })
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

  addUser(user: BasicUser) {
    const index = this.selectedOptions.findIndex((option) => option.id === user.id);
    const optionIndex=this.availableUserList.findIndex((option)=>option.id===user.id)
    if (index === -1) {
      this.selectedOptions.push(user);
      this.availableUserList.splice(optionIndex, 1)
    }
    this.toggleDropdown() 
  }

  removeUser(user: BasicUser){
    const index=this.selectedOptions.findIndex((option) => option.id === user.id);
    let removed=this.selectedOptions[index]
    this.selectedOptions.splice(index, 1)
    this.availableUserList.push(removed)
  }

  //this can be moved to a service
  fetchUsers=async()=>{
    if (this.company){
      let response=await fetchData(`company/${this.company.id}/users`)
      .then((users)=>{
        console.log(users)
        this.availableUserList=users
      })
    }
  }
  
  resetForm(){
     //add the users back into the list and clear out form
     this.fetchUsers()
     this.formData.reset()
     this.selectedOptions=[]
  }
  onSubmit(){
    if (this.formData.valid && this.currentUser){
      this.isError=false
      let team={
        name: this.formData.controls['name'].value,
        description: this.formData.controls['description'].value,
        validation: {
          credentials: this.credentials,
          profile: this.currentUser.profile,
          admin: this.currentUser.admin
        }
      }
      if (this.credentials && this.company && this.company.id){
        this.teamService.createTeam(team, this.company.id, this.selectedOptions,this.currentUser, this.credentials).then((response)=>{
          this.resetForm()
        })
      }
      //emit events to parent
      this.close.emit()

      //reload page without a window reload
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl('/teams')
      });
    }
    else{
      this.isError=true;
    }
  }
}
