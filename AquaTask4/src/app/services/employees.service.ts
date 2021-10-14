import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from './general-service.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends GeneralService{

  constructor( 
    private httpb: HttpClient,
    private routerb: Router) {
    super(httpb,routerb);
  }
  gellAllEmployees(): Observable<any> {
    return this.getBase<any>('employees/all');
  }
  
  deleteEmployee(id:number): Observable<any>{
    return this.deleteBase(`employees/${id}`);
  }
   
  updateEmployee(employee:any): Observable<any>{
    return this.putBase(`employees/${employee.id}`,employee);
  }

  createEmployee(employee:any): Observable<any>{
    return this.postBase('employees',employee);
  }
}
