import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addUser(user: User){
    let users: User[] = [];
    let storedUsers = localStorage.getItem('Users');
    if (storedUsers) users = JSON.parse(storedUsers);
    users.push(user);

    localStorage.setItem('Users',JSON.stringify(users));
  }

}
