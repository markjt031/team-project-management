import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models';
import { CompanyService } from '../company.service';

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
  expired: Boolean = true;
  showPopup: Boolean = false;

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => {
      this.user = user;
      this.isInvalidLogin = user.id === -1;
    });
    const user = localStorage.getItem('user');
    if (user) {
      this.redirectIfLoggedIn();
    }
    this.userService.sessionExpired.subscribe((expired)=>{
      this.expired=expired
    })
    if (this.expired){
      this.triggerPopup()
    }
  }

  checkLoginButtonDisabled = () => {
    if (this.username && this.password) {
      this.isLoginButtonDisabled = false;
    } else {
      this.isLoginButtonDisabled = true;
    }
  };

  login = async () => {
    await this.userService.logInUser({
      username: this.username,
      password: this.password,
    });

    if (!this.isInvalidLogin) {
      this.redirectIfLoggedIn();
    }
    this.hasAttemptedLogin = true;
  };

  logout = () => {
    this.userService.logOutUser();
  };

  redirectIfLoggedIn = () => {
    if (this.user?.admin) {
      this.router.navigate(['/company']);
    } else {
      this.companyService.updateCompany(
          this.user?.companies[0] || 
          {id: -1, 
          name: '',
          description:'',
          users: [],
          teams: [],
        }
      );
      this.router.navigate(['/announcements']);
    }
  };
  triggerPopup(){
    this.showPopup=!this.showPopup
  }
}
