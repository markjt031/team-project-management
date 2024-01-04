import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoginButtonDisabled: boolean = true;
  isInvalidLogin: boolean = false;
  hasAttemptedLogin: boolean = false;
  user: User | undefined = undefined;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => {
      this.user = user;
      this.isInvalidLogin = user.id === -1 ? true : false;
    });
  }

  checkLoginButtonDisabled = () => {
    if (this.username && this.password) {
      this.isLoginButtonDisabled = false;
    } else {
      this.isLoginButtonDisabled = true;
    }
  };

  login = async () => {
    this.hasAttemptedLogin = true;
    await this.userService.logInUser({
      username: this.username,
      password: this.password,
    });

    if (!this.isInvalidLogin) {
      this.user?.admin
        ? this.router.navigate(['/company'])
        : this.router.navigate(['/announcements']);
    }
  };

  logout = () => {
    this.userService.logOutUser();
  };
}
