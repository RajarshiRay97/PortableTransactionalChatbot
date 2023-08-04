import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user: any): User|undefined{
    let userArray = [];
    let storedUsers = localStorage.getItem('Users');
    if(storedUsers) userArray = JSON.parse(storedUsers);
    return userArray.find((u: User) => u.userName === user.userName && u.password === user.password);
  }

}
