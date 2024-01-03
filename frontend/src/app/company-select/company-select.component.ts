import { Component } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.css']
})
export class CompanySelectComponent {
  constructor(private companyData: CompanyService) {}
  open: boolean = false;

  openSelect() {
    this.open = !this.open
  }

  selectCompany() {
    console.log(this.companyData.currentCompany)
  }
}
