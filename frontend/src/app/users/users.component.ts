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
