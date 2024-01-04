import { Component, EventEmitter, Output } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import Project from '../models/Project'
import { LocationStrategy } from '@angular/common'
import Team from '../models/Team'
import { fetchData } from '../services/api'
import { User } from '../models/User'
import { UserService } from '../user.service'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  @Output() updateProjectsList = new EventEmitter<void>()
  id: number = 0
  projects: Project[]=[]
  name: string | null=''
  team: any
  companyId: number = 0
  addModalShown= false
  currentUser: User | undefined = undefined

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: LocationStrategy,
    private userService: UserService){}


  ngOnInit(){
    this.userService.currentUser.subscribe((user)=>{
      this.currentUser=user
      if (this.currentUser.id===-1){
        this.router.navigateByUrl('login')
      }
    })
    const state= this.location.getState()
    if (state && typeof state=== 'object'){
      if ('name' in state && typeof state.name==='string'){
        this.name=state.name
      }
      if ('projects' in state && state.projects instanceof Array){
        this.projects=state.projects
      }
      if ('team' in state && typeof state.team==='object'){
        this.team=state.team
      }
      if ('companyId' in state && typeof state.companyId==='number'){
        this.companyId=state.companyId
      }
    }
    this.route.queryParams.subscribe(params => {
      this.id = this.route.snapshot.params['id']
    })
    this.updateProjectsList.subscribe(() => {
      this.getProjects()
    })
  }
  toggleModal(){
    this.addModalShown=!this.addModalShown
  }
  getProjects=async()=>{
    try {
      const projects = await fetchData(`company/${this.companyId}/teams/${this.team.id}/projects`)
      this.projects = projects
    } 
    catch (error) {
      console.error('Error fetching projects:', error)
    }
  }
}
