import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employees.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-employeet-pop-up',
  templateUrl: './employeet-pop-up.component.html',
  styleUrls: ['./employeet-pop-up.component.css']
})
export class EmployeetPopUpComponent implements OnInit {
  projects: any;

  constructor( 
    private locatStorage:LocalStorageService,
    private projectService: ProjectsService,
    private employeesService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeetPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.projectService.gellAllProjects().subscribe(res =>{
      this.projects = res;
    })
  }

  action(){
    if(this.data.employee.id > 0)
      this.update();
    else
      this.create();
  }

  update(){
    this.employeesService.updateEmployee(this.data.employee).subscribe(res=>
      { 
        this.locatStorage.openSnackBar("Succes");
        this.dialogRef.close();
      },(error) => { 
        this.locatStorage.openSnackBar(error.message);
       });
  }

  create(){
    debugger;
    this.employeesService.createEmployee(this.data.employee).subscribe(res=>
      { 
        this.locatStorage.openSnackBar("Succes");
        this.dialogRef.close();
      },(error) => { 
        this.locatStorage.openSnackBar(error.message);
       });
  }
}
