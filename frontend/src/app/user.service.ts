import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, Credentials } from './models';
import { fetchData } from './services/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<User>({
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
  currentUser = this.user.asObservable();

  constructor(private router: Router) {}

  updateUser = (user: User) => {
    this.user.next(user);
  };

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
      localStorage.setItem('user', JSON.stringify(userData));
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
    this.router.navigate(['/login']);
  };
}
