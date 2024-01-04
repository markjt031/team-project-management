import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import Team from "../models/Team";
import { fetchData } from "./api";
import { User } from "../models/User";


@Injectable({
    providedIn: 'root',
  })

  export class TeamService{
      private teamList=new BehaviorSubject<Team[]>([])

      currentTeamList=this.teamList.asObservable()

      updateTeam(teams: Team[] | Observable<Team[]>){
        if (teams instanceof Observable){
          teams.subscribe(updatedTeams=>{
            this.teamList.next(updatedTeams)
          })
        }
        else{
          this.teamList.next(teams)
        }
      }
      
      fetchTeams(companyId: number | undefined, currentUser: User | undefined): Observable<Team[]> {
        // Assuming fetchData returns a Promise that resolves to Team[]
        return new Observable<Team[]>((observer) => {
          console.log("team service is fetching")
          fetchData(`company/${companyId}/teams`)
            .then((teams) => {
              if (currentUser && currentUser.admin){
                observer.next(teams)
                observer.complete();
              }
              else if(currentUser && !currentUser.admin){
                //this is to filter out teams based on if the user belongs to it
                //can be removed if an endpoint for fetching all teams a user belongs
                //to is added
                let tempTeams=[]
                for (let team of teams){
                  let containsUser=false
                  for (let teammate of team.teammates){
                    if (teammate.id===currentUser.id){
                      containsUser=true
                    }
                  }
                  containsUser && tempTeams.push(team)
                }
                observer.next(tempTeams)
                observer.complete();
              }
            })
            .catch((error) => {
              observer.error(error);
            });
        });
      }
      

  }