import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private notifiction: MatSnackBar) { }
  private storageSub = new Subject<String>();

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  get token():any {
    return sessionStorage.getItem('token');
  }

  set token(value: string) {
    sessionStorage.setItem('token', value);
    this.storageSub.next('changed');
  }

  deleteToken() {
    sessionStorage.removeItem('token');
    this.router.navigate(['LogIn']);
    this.storageSub.next('deleted');
    return false;
  }

  isAuthenticated() {
    return this.jwtHelper.isTokenExpired(this.token);
  }

  role(): any {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(this.token);
      return decodedToken.role;
    }
    return '';
  }

  openNotifiction(message: string) {
    this.notifiction.open(message, '',{
      duration: 2000,
    });
  }
}

