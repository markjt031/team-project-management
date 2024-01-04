import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface company {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private company = new BehaviorSubject<company>({ id: -1, name: 'null' });
  currentCompany = this.company.asObservable();

  constructor() {
    const company = localStorage.getItem('company');
    if (company) {
      this.updateCompany(JSON.parse(company));
    }
  }

  updateCompany(company: company) {
    this.company.next(company);
    localStorage.setItem('company', JSON.stringify(company));
  }
}
