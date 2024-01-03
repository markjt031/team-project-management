import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanySelectComponent } from './company-select/company-select.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: "company", component: CompanySelectComponent }, 
  { path: "users", component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
