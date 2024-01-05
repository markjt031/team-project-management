import { Component, EventEmitter, Output } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LocationStrategy } from '@angular/common'
import { fetchData } from '../services/api'
import { User, Project, Team, Company } from '../models/'
import { UserService } from '../user.service'
import { CompanyService } from '../company.service'
import { ProjectService } from '../services/projectService'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  @Output() updateProjectsList = new EventEmitter<void>()
  id: number = 0
  projects: Project[]=[]
  team: any
  company: Company | undefined= undefined
  addModalShown= false
  currentUser: User | undefined = undefined

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: LocationStrategy,
    private userService: UserService,
    private projectService: ProjectService,
    private companyService: CompanyService){}


  ngOnInit(){
    this.userService.currentUser.subscribe((user)=>{
      this.currentUser=user
      if (this.currentUser.id===-1){
        this.router.navigateByUrl('login')
      }
    })
    const state= this.location.getState()
    if (state && typeof state=== 'object'){
      //this can be replaced if a get team by id endpoint is implemented
      //data won't persist on refresh until I can remove this state object
      // if ('name' in state && typeof state.name==='string'){
      //   this.name=state.name
      // }
      if ('team' in state && typeof state.team==='object'){
        this.team=state.team
      }
    }
    this.route.queryParams.subscribe(params => {
      this.id = this.route.snapshot.params['id']
    })
    this.projectService.currentProjectsList.subscribe((projects)=>this.projects=projects)
    this.companyService.currentCompany.subscribe((company)=>this.company=company)
    this.updateProjectsList.subscribe(() => {
      this.getProjects()
    })
  }
  toggleModal(){
    this.addModalShown=!this.addModalShown
  }
  getProjects=async()=>{
    this.projectService.getProjects(this.team.id)
  }
}
