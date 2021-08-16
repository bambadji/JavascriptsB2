import { Injectable } from '@angular/core';
import { User } from "../modeles/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  access:boolean = false;

  constructor() { }

  login(user:User) {
    if(user.login == 'admin' && user.password == 'admin'){
      this.access = true;
      //this.router.navigate(["home"]);
      return true;
    }else {
      return false;
    }
  }

  laisser_passer() {
    return this.access;
  }

  



}
