import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamCardComponent } from './teams/team-card/team-card.component';
import { AddTeamButtonComponent } from './teams/add-team-button/add-team-button.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddTeamModalComponent } from './teams/add-team-modal/add-team-modal.component';
import { LoginComponent } from './login/login.component';
import { CompanySelectComponent } from './company-select/company-select.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsDisplayComponent } from './projects/projects-display/projects-display.component';
import { AddProjectModalComponent } from './projects/add-project-modal/add-project-modal.component';
import { EditProjectModalComponent } from './projects/edit-project-modal/edit-project-modal.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnnouncementComponent } from './announcements/announcement/announcement.component';
import { PostModalComponent } from './announcements/post-modal/post-modal.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanySelectComponent,
    NavbarComponent,
    UsersComponent,
    LoginComponent,
    TeamsComponent,
    TeamCardComponent,
    AddTeamButtonComponent,
    ProjectsComponent,
    AddTeamModalComponent,
    ProjectsDisplayComponent,
    AddProjectModalComponent,
    EditProjectModalComponent,
    AnnouncementsComponent,
    AnnouncementComponent,
    PostModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, FormsModule],
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
