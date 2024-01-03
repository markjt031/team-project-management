import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CompanySelectComponent } from './company-select/company-select.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AnnouncementsComponent } from './announcements/announcements.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanySelectComponent,
    NavbarComponent,
    LoginComponent,
    AnnouncementsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
