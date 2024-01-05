import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { CompanyService } from '../company.service';
import { User } from '../models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(private userData: UserService, private companyData: CompanyService) {}

  companyId: number | undefined = undefined;
  data : User[] = [
    // {name: 'Chris Purnell', email: 'yocrizzle@gmail.com', team: 'Chic-Fila', active: true, admin: true, status: 'JOINED'},
    // {name: 'Frank Fournier', email: 'foshizzle@gmail.com', team: 'PopEyes', active: true, admin: true, status: 'JOINED'},
    // {name: 'Will Marttala', email: 'wamizzle@gmail.com', team: '', active: false, admin: false, status: 'PENDING'},
    // {name: 'Helena Makendengue', email: 'hmasizzle@gmail.com', team: '', active: false, admin: false, status: 'PENDING'}
  ]

  cardOpen: boolean = true;
  makeUserAdmin: string = "";

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
    confirmPassword: new FormControl<string>('')
  })

  ngOnInit() {
    this.companyData.currentCompany.subscribe(company => this.companyId = company.id)
    this.getData()
    
  }

  async getData() {
    let res = await fetch('http://localhost:8080/company/' + this.companyId)
    let company = await res.json()

    let employeeArr = []
    // for(const emp of company.employees) {
    //   employeeArr.push({
    //     name: emp.profile.firstName + " " + emp.profile.lastName,
    //     email: emp.profile.email,
    //     team: this.findTeam(emp.profile.firstName, emp.profile.lastName, company.teams),
    //     admin: emp.admin,
    //     active: emp.active,
    //     status: emp.status
    //   })

      this.data = [...company.employees]
  }

  findTeam(fname: string, lname: string, teamList: any[]) {
    for(const team of teamList) {
      for(const emp of team.teammates) {
        if(emp.profile.firstName === fname && emp.profile.lastName === lname) return team.name;
      }
    }

    return ''
  }

  openCloseCard() {
    this.cardOpen = !this.cardOpen
  }

  closeCard() {
    this.userForm = new FormGroup({
      firstName: new FormControl<string>(''),
      lastName: new FormControl<string>(''),
      email: new FormControl<string>(''),
      password: new FormControl<string>(''),
      confirmPassword: new FormControl<string>('')
    })
    this.makeUserAdmin = ''
    this.cardOpen = !this.cardOpen;
  }

  updateMakeUserAdmin(s: string) {
    this.makeUserAdmin = s;
  }

  async handleSubmit() {
    const form = this.userForm.value

    let currentUserCredentials = localStorage.getItem('credentials')
    if(currentUserCredentials == null) currentUserCredentials = JSON.stringify({username: 'hi', password: 'hi'})

    const userRequestDto = {
      credentials: { 
        username: form.firstName.charAt(0) + form.lastName,
        password: form.password
      },
      profile: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: '0000000000'
      },
      admin: this.makeUserAdmin === "YES" ? true : false
    }

    const currentUserRequestDto = {
      credentials: JSON.parse(currentUserCredentials),
      profile: {},
      admin: false
    }

    this.userData.currentUser.subscribe(user => {
      currentUserRequestDto.profile = user.profile
      currentUserRequestDto.admin = user.admin
    })

    let res = await fetch('http://localhost:8080/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userRequestDto)
    }) 
    
    let jsonres = await res.json()
    console.log(jsonres)

    setTimeout( async () => {
      res = await fetch('http://localhost:8080/company/' + this.companyId + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          admin: currentUserRequestDto,
          newEmployeeId: jsonres.id
        })
      })
      let success = await res.json()
      console.log(success)
      if(success.id) {
        this.cardOpen=false
        window.location.reload()
      }
    }, 1000)

  }
}
