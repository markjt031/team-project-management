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
  open: boolean = false;
  user: User | undefined = undefined;
  companies: Company[] = [];

  constructor(
    private companyService: CompanyService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => {
      this.user = user;
      this.companies = user.companies;
    });
  }

  openSelect() {
    this.open = !this.open;
  }

  selectCompany(company: Company) {
    this.companyService.updateCompany(company);
    this.router.navigate(['/announcements']);
  }
}
