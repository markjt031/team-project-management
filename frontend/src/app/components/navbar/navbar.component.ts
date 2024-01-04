import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  open: boolean = false;

  constructor(private userService: UserService) {}

  menuClick() {
    this.open = !this.open;
  }

  logout = () => {
    this.userService.logOutUser();
  };
}
