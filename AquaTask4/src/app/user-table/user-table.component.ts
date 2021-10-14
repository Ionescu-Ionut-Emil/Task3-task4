import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  users: any;
  constructor(
    private locatStorage:LocalStorageService,
    private employeesService: UserService,
    
  ) { }

  ngOnInit(): void {
    this.employeesService.getUser().subscribe(res =>{
      this.users=res;
      this.locatStorage.openSnackBar("Succes");
    },(error)=>{
      this.locatStorage.openSnackBar(error.message);
  })
  }
   
  deleteUser(id:number){
    this.employeesService.deleteUser(id).subscribe(res =>
      {
        this.locatStorage.openSnackBar("Succes");
        this.ngOnInit();
      },(error) => { 
        this.locatStorage.openSnackBar(error.message);
      });

  }




}
