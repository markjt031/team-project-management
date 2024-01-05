import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Company } from "./models";

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
    private company = new BehaviorSubject<Company>({
        id: -1, 
        name: '',
        description:'',
        users: [],
        teams: [],
    })

    currentCompany = this.company.asObservable();
    constructor() {
        const company = localStorage.getItem('company');
        if (company) {
          this.updateCompany(JSON.parse(company));
        }
    }
    updateCompany(company: Company) {
        this.company.next(company)
        localStorage.setItem('company', JSON.stringify(company))
    }
}
