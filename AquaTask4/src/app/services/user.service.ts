import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from './general-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GeneralService{

  constructor( 
    private httpb: HttpClient,
    private routerb: Router) {
    super(httpb,routerb);
  }
  getUser(){
    return this.getBase('users')
  }
  deleteUser(id:any){
    return this.deleteBase(`users/${id}`)
  }

  register(user:any){
    return this.postBase('logIn/register',user)
  }

  logIn(user:any){
    return this.postBase('logIn',user)
  }
}
