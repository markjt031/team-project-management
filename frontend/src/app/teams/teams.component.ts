import { Component } from '@angular/core';
import Team from '../models/Team';
import { fetchData } from '../services/api';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  //company id should be based on the company from the use that is logged in.
  //will be pulled from UserService when implemented
  companyId: number = 1
  teams: Team[]|undefined= undefined
  showModal: boolean = false

  ngOnInit(){
    this.fetchTeams()
  }

  fetchTeams= async()=>{
    let response =await fetchData(`company/${this.companyId}/teams`)
      .then((teams: any)=>{
        console.log(teams)
        this.teams=teams
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
