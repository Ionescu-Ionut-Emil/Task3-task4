import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from './general-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends GeneralService{

  constructor( 
    private httpb: HttpClient,
    private routerb: Router) {
    super(httpb,routerb);
  }
  gellAllProjects(): Observable<any> {
    return this.getBase<any>('projects');
  }
  
  deleteProject(id:number): Observable<any>{
    return this.deleteBase(`projects/${id}`);
  }

  updateProject(project:any){
    return this.putBase(`projects/${project.id}`,project)
  }

  createProject(project:any){
    return this.postBase('projects',project)
  }
}
