import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Credentials } from 'src/app/models/Credentials';
import FullUser from 'src/app/models/FullUser';
import Team from 'src/app/models/Team';
import { User } from 'src/app/models/User';
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
  companyId: number = 1
  availableUserList: FullUser[]=[]
  selectedOptions: FullUser[]=[]
  
  isError: boolean=false
  isDropdownOpen: boolean = false
  currentUser: User | undefined = undefined
  credentials: Credentials | undefined = undefined

  formData: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });


  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private teamService: TeamService){}

  ngOnInit(){
    this.userService.currentUser.subscribe((user: User)=>{
      this.currentUser=user
    })
    this.userService.currentUserCredentials.subscribe((credentials : Credentials)=>{
      this.credentials=credentials
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
    let removed=this.selectedOptions[index]
    this.selectedOptions.splice(index, 1)
    this.availableUserList.push(removed)
  }

  //this can be moved to a service
  fetchUsers=async()=>{
    let response=await fetchData(`company/${this.companyId}/users`)
    .then((users)=>{
      console.log(users)
      this.availableUserList=users
    })
  }
  postTeammate=async(user: FullUser, teamId: number)=>{
    if (this.currentUser){
      console.log("we're posting")
    let body={
      admin: {
        credentials: this.credentials,
        profile: this.currentUser.profile,
        admin: this.currentUser.admin
      },
      newTeammate: user
    }
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    await fetchData(`teams/${teamId}/users`, options).then(()=>{
      console.log("teammate posted")
    })
    }
  }
  createTeam = async (team: any) => {
    try {
      const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(team),
      }
  
      const createdTeam = await fetchData(`company/${this.companyId}/teams`, options)
  
      if (createdTeam && createdTeam.id) {
        // Individually add all the team mates
        for (let teammate of this.selectedOptions) {
          await this.postTeammate(teammate, createdTeam.id)
        }
  
        // Fetch teams and update
        const teams = await this.teamService.fetchTeams(this.companyId, this.currentUser)
        this.teamService.updateTeam(teams);

      } else {
        console.error('Error creating team: Team ID is undefined')
      }
    } catch (error) {
      console.error('Error creating team:', error)
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
      this.createTeam(team).then((response)=>{
        this.resetForm()
      })
      
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
