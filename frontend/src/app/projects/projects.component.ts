import { Component, EventEmitter, Output } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LocationStrategy } from '@angular/common'
import { fetchData } from '../services/api'
import { User, Project, Team, Company } from '../models/'
import { UserService } from '../user.service'
import { CompanyService } from '../company.service'
import { ProjectService } from '../services/projectService'
import { TeamService } from '../services/teamsService'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  @Output() updateProjectsList = new EventEmitter<void>()
  id: number = 0
  projects: Project[]=[]
  team: Team | undefined= undefined
  company: Company | undefined= undefined
  addModalShown= false
  currentUser: User | undefined = undefined

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: LocationStrategy,
    private userService: UserService,
    private projectService: ProjectService,
    private companyService: CompanyService,
    private teamService: TeamService){}


  ngOnInit(){
    this.userService.currentUser.subscribe((user)=>{
      this.currentUser=user
      if (this.currentUser.id===-1){
        this.router.navigateByUrl('login')
      }
    })
    this.route.queryParams.subscribe(params => {
      this.id = this.route.snapshot.params['id']
    })
    this.teamService.getTeamById(this.id)
    this.teamService.currentTeam.subscribe((team)=>{
      console.log(team)
      this.team=team
      if (this.team && this.team.id){
        this.getProjects()
      }
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
    if (this.team && this.team.id){
      this.projectService.getProjects(this.team.id)
    }
  }
  getTeam=async()=>{
    this.teamService.getTeamById(this.id)
  }
}
