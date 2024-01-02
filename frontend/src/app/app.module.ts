import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamCardComponent } from './teams/team-card/team-card.component';
import { AddTeamButtonComponent } from './teams/add-team-button/add-team-button.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddTeamModalComponent } from './teams/add-team-modal/add-team-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    TeamCardComponent,
    AddTeamButtonComponent,
    ProjectsComponent,
    AddTeamModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
