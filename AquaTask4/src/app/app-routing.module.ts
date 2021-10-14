import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { UserTableComponent } from './user-table/user-table.component';
const routes: Routes = [
  {
    path:'Home',
    component:HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { 
      expectedRole:[ 'Admin','User']
    }  
  },
  {
    path:'Employees',
    component:EmployeesTableComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { 
      expectedRole:[ 'Admin','User']
    }  
  },
  {
    path:'Users',
    component:UserTableComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { 
      expectedRole: 'Admin'
    }  
  },
  {
    path:'Projects',
    component:ProjectsTableComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { 
      expectedRole:[ 'Admin','User']
    }   
  },
  {
    path:'Register',
    component:RegisterComponent,
    pathMatch: 'full' 
  },
  {
    path:'LogIn',
    component:LogInComponent,
    pathMatch: 'full' 
  },
  { 
    path: '',   
    redirectTo: '/Home',
    pathMatch: 'full'
  },
  { 
    path: '**',   
    redirectTo: '/Home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
