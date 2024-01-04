import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, Credentials } from './models';
import { fetchData } from './services/api';


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

  //added this in because all of the post endpoints require this to be passed in
  //even though this is very insecure
  private credentials=new BehaviorSubject<Credentials>({
      username: "",
      password: ""
  })
  currentUserCredentials=this.credentials.asObservable()

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
    } catch (error) {
      console.error(error);
    }
  };
}
