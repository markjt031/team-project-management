import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, Credentials } from './models';
import { fetchData } from './services/api';
import { Router } from '@angular/router';

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

  //added this in because all of the post endpoints require this to be passed in
  //even though this is very insecure. This can be fixed if we implement token auth
  private credentials=new BehaviorSubject<Credentials>({
      username: "",
      password: ""
  })
  currentUserCredentials=this.credentials.asObservable()
  
  constructor(private router: Router) {
    const user = localStorage.getItem('user');
    if (user) {
      this.updateUser(JSON.parse(user));
    }
    const credentials = localStorage.getItem('credentials')
    if (credentials){
      this.updateCredentials(JSON.parse(credentials))
    }
  }

  updateUser = (user: User) => {
    this.user.next(user);
  };
  updateCredentials= (credentials: Credentials)=>{
    this.credentials.next(credentials)
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
      const userData: User = await fetchData(`users/login`, options);
      this.updateUser(userData);
      this.updateCredentials(credentials)
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('credentials', JSON.stringify(credentials));
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
    localStorage.removeItem('credentials')
    this.updateCredentials({
      username: "",
      password: ""})
    this.router.navigate(['/login']);
  };
}
