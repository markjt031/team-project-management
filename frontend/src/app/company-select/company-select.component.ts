import { Component } from '@angular/core';
import { CompanyService } from '../company.service';
import { UserService } from '../user.service';
import { Company, User } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.css'],
})
export class CompanySelectComponent {
  constructor(
    private companyService: CompanyService,
    private userService: UserService,
    private router: Router
  ) {}
  open: boolean = false;
  companies: Company[] = [];
  
  currentUser: User | undefined = undefined

  ngOnInit(){
    this.userService.currentUser.subscribe((user)=>this.currentUser=user)
    if(this.currentUser){
      this.companies=this.currentUser.companies
    }
  }
  openSelect() {
    this.open = !this.open;
  }

  selectCompany(company: Company) {
    this.companyService.updateCompany(company);
    this.router.navigate(['/announcements']);
  }
  
}
