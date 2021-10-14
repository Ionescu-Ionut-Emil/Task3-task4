import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from '../services/local-storage.service';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-project-pop-up',
  templateUrl: './project-pop-up.component.html',
  styleUrls: ['./project-pop-up.component.css']
})
export class ProjectPopUpComponent implements OnInit {

  constructor(
    private locatStorage:LocalStorageService,
    private projectService: ProjectsService,
    public dialogRef: MatDialogRef<ProjectPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

  action(){
    if(this.data.project.id > 0)
      this.update();
    else
      this.create();
  }

  update(){
    this.projectService.updateProject(this.data.project).subscribe(res=>
      { 
        this.locatStorage.openSnackBar("Succes");
        this.dialogRef.close();
      },(error) => { 
        this.locatStorage.openSnackBar(error.message);
       });
  }

  create(){
    this.projectService.createProject(this.data.project).subscribe(res=>
      { 
        this.locatStorage.openSnackBar("Succes");
        this.dialogRef.close();
      },(error) => { 
        this.locatStorage.openSnackBar(error.message);
       });
  }
}
