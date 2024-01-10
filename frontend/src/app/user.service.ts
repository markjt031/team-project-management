import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, Credentials } from './models';
import { fetchData } from './services/api';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const initialUser: User = {
  id: -1,
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  admin: false,
  active: false,
  status: '',
  companies: [],
  teams: [],
};


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<User>(initialUser);
  currentUser = this.user.asObservable();
  
  constructor(private router: Router) {
    const user = localStorage.getItem('user');
    if (user) {
      this.updateUser(JSON.parse(user));
    }
  }
  private jwtExpirationTimer: NodeJS.Timeout | undefined = undefined;
  private  jwtHelper=new JwtHelperService();

  private isSessionExpired=new BehaviorSubject<Boolean>(false)
  sessionExpired=this.isSessionExpired.asObservable();

  updateUser = (user: User) => {
    this.user.next(user);
  };

  updateExpired(expired: Boolean){
    this.isSessionExpired.next(expired)
  }
  logInUser = async (credentials: Credentials) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      };
      const userData = await fetchData(`users/login`, options);
      console.log(userData);
      //The double quotes from the JSON response cause issues with the token
      let token=`${userData.tokenType} ${userData.accessToken}`;
      let tokenExpiration=this.jwtHelper.getTokenExpirationDate(userData.accessToken)
      this.startTimer(tokenExpiration)
      let user: User=userData
      if (userData.roles.includes('ROLE_ADMIN')){
        user.admin=true;
      }
      
      this.updateUser(user);
      this.updateExpired(false);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
    } catch (error) {
      console.error(error);
    }
  };

  logOutUser = () => {
    this.updateUser({
      id: -1,
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      admin: false,
      active: false,
      status: '',
      companies: [],
      teams: [],
    });
    localStorage.removeItem('user');
    localStorage.removeItem('token')
    this.clearTimer()
    this.router.navigate(['/login']);
  };

  startTimer(jwtExpirationTime: Date | null){
    if (jwtExpirationTime){
      let time=jwtExpirationTime.getTime()-Date.now()
      this.jwtExpirationTimer=setTimeout(()=>{
        this.updateExpired(true)
        this.logOutUser()
      }, time)
    }
  }
  clearTimer(){
    clearTimeout(this.jwtExpirationTimer);
  }
}
