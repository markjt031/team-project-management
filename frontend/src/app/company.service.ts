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

    updateCompany(company: Company) {
        this.company.next(company)
    }
}