import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => {
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
      this.router.navigate(['/']);
    }
  };
}
