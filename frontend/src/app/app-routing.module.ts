import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { CompanySelectComponent } from './company-select/company-select.component';

const routes: Routes = [
  { path: "company", component: CompanySelectComponent },
  {path: 'teams', component: TeamsComponent},
  {path: 'teams/:id/projects', component: ProjectsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
