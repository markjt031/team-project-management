import { Component } from '@angular/core';
import { CompanyService } from '../company.service';
import { UserService } from '../user.service';
import { User } from '../models/User';
import { Company } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.css']
})
export class CompanySelectComponent {
  constructor(private companyData: CompanyService, private userService: UserService, private router: Router) {}
  open: boolean = false;

  companyOptions: Company[]=[]
  currentUser: User | undefined = undefined

  ngOnInit(){
    this.userService.currentUser.subscribe((user)=>this.currentUser=user)
    if(this.currentUser){
      this.companyOptions=this.currentUser.companies
    }
  }
  openSelect() {
    this.open = !this.open
  }

  selectCompany(company: Company) {
    this.companyData.updateCompany(company)
    this.router.navigateByUrl('/announcements')
  }
  
}
