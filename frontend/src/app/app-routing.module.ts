import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { CompanySelectComponent } from './company-select/company-select.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {path: 'teams', component: TeamsComponent},
  {path: 'teams/:id/projects', component: ProjectsComponent},
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'company', component: CompanySelectComponent },
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
