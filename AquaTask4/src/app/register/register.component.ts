import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName: any;
  password: any;
  confrimPassword: any;

  constructor(
    private userService:UserService,
    private router: Router,
    private locatStorage:LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  register(){

    if(!this.password ||this.password.length === 0 || !this.userName ||this.userName.length === 0 ){
      return this.locatStorage.openSnackBar("Insert credentials.");
    }

    if(this.password.length < 5){
      return this.locatStorage.openSnackBar("Password must have more than 5 characters.");
    }

    if(this.password !== this.confrimPassword){
      return this.locatStorage.openSnackBar("Password and Confirm Password are not the same.");
    }

    let newUser = {
      User_name:this.userName,
      Password:this.password
    }

    this.userService.register(newUser).subscribe(res =>{
      this.router.navigate(['LogIn']);
      this.locatStorage.openSnackBar('Succes');
    },(error)=>{
      this.locatStorage.openSnackBar(error.message);
  })
  }
}
