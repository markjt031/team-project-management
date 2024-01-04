import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { CompanySelectComponent } from './company-select/company-select.component';

const routes: Routes = [
  
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'company', component: CompanySelectComponent },
  {path: 'teams', component: TeamsComponent},
  {path: 'teams/:id/projects', component: ProjectsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
