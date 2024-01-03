import { Component } from '@angular/core';
import Team from '../models/Team';
import { fetchData } from '../services/api';
import { User } from '../models/User';
import { UserService } from '../user.service';
import BasicUser from '../models/BasicUser';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  //company id should be based on the company from the use that is logged in.
  //will be pulled from UserService when implemented
  companyId: number | undefined = 1
  teams: Team[] = []
  showModal: boolean = false
  currentUser: User | undefined = undefined

  constructor(private userService: UserService){}
  ngOnInit(){
    this.userService.currentUser.subscribe((user: User)=>{
      this.currentUser=user
      //assuming non-admins only have one company
      if (!user.admin){
        this.companyId=this.currentUser.companies[0].id
      }
      else{
        //set companyID from companyService
      }
    })
    this.fetchTeams()
  }

  fetchTeams= async()=>{
    let response =await fetchData(`company/${this.companyId}/teams`)
      .then((teams: any)=>{
        console.log(this.currentUser)
        console.log(teams)
        if (this.currentUser && this.currentUser.admin){
          this.teams=teams
        }
        else if(this.currentUser && !this.currentUser.admin){
          //this is to filter out teams based on if the user belongs to it
          //can be removed if an endpoint for fetching all teams a user belongs
          //to is added
          for (let team of teams){
            let containsUser=false
            for (let teammate of team.teammates){
              if (teammate.id===this.currentUser.id){
                containsUser=true
              }
            }
            containsUser && this.teams?.push(team)
          }
        }
        console.log(this.teams)
      })
    }

    toggleCreateModal(){
      this.showModal=!this.showModal
      console.log(this.showModal)
    }
    closeModal(){
      console.log("closing again")
      this.showModal=false;
    }
}
