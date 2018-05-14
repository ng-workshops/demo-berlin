import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUser() {
    return {
      name: 'Test',
      firstname: 'Hans'
    };
  }

  searchUser(name = 'hello') {
    return name.toUpperCase();
  }
}
