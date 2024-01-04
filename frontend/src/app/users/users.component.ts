import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  data = [
    {name: 'Chris Purnell', email: 'yocrizzle@gmail.com', team: 'Chic-Fila', active: true, admin: true, status: 'JOINED'},
    {name: 'Frank Fournier', email: 'foshizzle@gmail.com', team: 'PopEyes', active: true, admin: true, status: 'JOINED'},
    {name: 'Will Marttala', email: 'wamizzle@gmail.com', team: '', active: false, admin: false, status: 'PENDING'},
    {name: 'Helena Makendengue', email: 'hmasizzle@gmail.com', team: '', active: false, admin: false, status: 'PENDING'}
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
    this.getData()
  }

  async getData() {
    let res = await fetch('http://localhost:8080/company/2')
    let company = await res.json()

    let employeeArr = []
    for(const emp of company.employees) {
      employeeArr.push({
        name: emp.profile.firstName + " " + emp.profile.lastName,
        email: emp.profile.email,
        team: this.findTeam(emp.profile.firstName, emp.profile.lastName, company.teams),
        admin: emp.admin,
        active: emp.active,
        status: emp.status
      })

      this.data = employeeArr
    }
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

  handleSubmit() {
    console.log({...this.userForm.value, admin: this.makeUserAdmin === "YES" ? true : false})
  }
}
