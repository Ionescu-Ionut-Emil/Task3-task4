import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  password: any;
  userName: any;

  constructor(
    private userService:UserService,
    private router: Router,
    private locatStorage:LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  logIn(){
    if(!this.password ||this.password.length === 0 || !this.userName ||this.userName.length === 0 ){
      return this.locatStorage.openNotifiction("Insert credentials.");
    }

    let user = {
      User_name:this.userName,
      Password:this.password
    }

    this.userService.logIn(user).subscribe(res =>{
      this.locatStorage.token = res.accessToken;
      this.locatStorage.openNotifiction('Succes');
      this.router.navigate(['Home']);
    },(error)=>{
      this.locatStorage.openNotifiction(error.message);
  })
  }
}
