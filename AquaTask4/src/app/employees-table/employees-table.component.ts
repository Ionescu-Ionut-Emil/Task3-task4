import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeetPopUpComponent } from '../employeet-pop-up/employeet-pop-up.component';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../services/employees.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements OnInit {

   employees: any;
  constructor(
    private locatStorage:LocalStorageService,
    private employeesService: EmployeeService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.employeesService.gellAllEmployees().subscribe(res =>{
      this.employees=res;
      this.locatStorage.openNotifiction("Succes");
    },(error)=>{
      this.locatStorage.openNotifiction(error.message);
  })
  }

  deleteEmloy(id:number){
    this.employeesService.deleteEmployee(id).subscribe(res =>
      {
        this.locatStorage.openNotifiction("Succes");
        this.ngOnInit();
      },(error) => { 
        this.locatStorage.openNotifiction(error.message);
      });

  }

  addNewEmployee(){
    let newEmployee:Employee =new Employee;
    const dialogRef = this.dialog.open(EmployeetPopUpComponent, {
      width: '350px',
      data: {event: "Create", employee:newEmployee }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  editEmployee(employee:any){
    const dialogRef = this.dialog.open(EmployeetPopUpComponent, {
      width: '350px',
      data: {event: "Edit", employee: employee}
    });
  }
}

