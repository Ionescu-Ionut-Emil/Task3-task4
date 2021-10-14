import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../model/project.model';
import { ProjectPopUpComponent } from '../project-pop-up/project-pop-up.component';
import { LocalStorageService } from '../services/local-storage.service';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.css']
})
export class ProjectsTableComponent implements OnInit {

   projects: any;
  constructor(
    private locatStorage:LocalStorageService,
    private projectService: ProjectsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.projectService.gellAllProjects().subscribe(res => {
      this.projects = res;
      this.locatStorage.openSnackBar("Succces");
    },(error) => { 
      this.locatStorage.openSnackBar(error.message);
     });
  }

  deleteProject(id:number){
    this.projectService.deleteProject(id).subscribe(res =>
      {
        this.locatStorage.openSnackBar("Succces");
        this.ngOnInit();
      },(error) => { 
        this.locatStorage.openSnackBar(error.message);
       });
  }

  editProject(project:any){
    const dialogRef = this.dialog.open(ProjectPopUpComponent, {
      width: '350px',
      data: {event: "Edit", project: project}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addNewProject(){
    let newProject:Project =new Project;
    const dialogRef = this.dialog.open(ProjectPopUpComponent, {
      width: '350px',
      data: {event: "Create", project:newProject }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
