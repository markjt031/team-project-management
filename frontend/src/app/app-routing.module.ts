import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CompanySelectComponent } from './company-select/company-select.component';
import { AnnouncementsComponent } from './announcements/announcements.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'company', component: CompanySelectComponent },
  { path: 'announcements', component: AnnouncementsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
