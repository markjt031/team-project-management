import { Component } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  open: boolean = false;
  isUserAdmin: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => {
      this.isUserAdmin = user.admin;
    });
  }

  menuClick() {
    this.open = !this.open;
  }

  logout = () => {
    this.userService.logOutUser();
  };
}
