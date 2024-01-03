import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface company {
    id: number,
    name: string
}

@Injectable({
    providedIn: 'root',
})

export class CompanyService {
    private company = new BehaviorSubject<company>({id: -1, name: 'null'})

    currentCompany = this.company.asObservable();

    updateCompany(company: company) {
        this.company.next(company)
    }
}