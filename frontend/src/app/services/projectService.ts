import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { fetchData } from "./api"
import { Project } from "../models"

@Injectable({
    providedIn: 'root',
  })
export class ProjectService{
    private projectList=new BehaviorSubject<Project[]>([])
    currentProjectsList=this.projectList.asObservable()

    updateProjects(projects: Project[]){
        this.projectList.next(projects)
    }

    getProjects=async(teamId: number)=>{
      console.log("getProjects")
      try {
      const token = localStorage.getItem('token')
      if (token){
        let parsedToken=JSON.parse(token)
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': parsedToken
            }
          }
        const projects = await fetchData(`teams/${teamId}/projects`, options).then((projects)=>{
          this.updateProjects(projects)
        })
      }
    } 
    catch (error) {
      console.error('Error fetching projects:', error)
    }
  }
}