import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { fetchData } from "./api";
import { Credentials, User, Team } from "../models/";


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
                observer.complete()
              }
            })
            .catch((error) => {
              observer.error(error)
            });
        });
      }

      postTeammate=async(userAdded: User, currentUser: User, credentials: Credentials, teamId: number)=>{
        if (currentUser){
        let body={
          admin: {
            credentials: credentials,
            profile: currentUser.profile,
            admin:currentUser.admin
          },
          newTeammate: userAdded
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
        })
        }
      }

      createTeam = async (team: any, companyId: number, selectedOptions: User[], currentUser: User, credentials: Credentials) => {
        try {
          const options = {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(team),
          }
      
        const createdTeam = await fetchData(`company/${companyId}/teams`, options)
      
        if (createdTeam && createdTeam.id) {
            // Individually add all the team mates
            for (let teammate of selectedOptions) {
              await this.postTeammate(teammate, currentUser, credentials, createdTeam.id)
            }
      
            // Fetch teams and update
            const teams = await this.fetchTeams(companyId, currentUser)
            this.updateTeam(teams);
    
          } else {
            console.error('Error creating team: Team ID is undefined')
          }
        } catch (error) {
          console.error('Error creating team:', error)
        } 
      }
      

  }