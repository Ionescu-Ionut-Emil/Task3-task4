import { Injectable } from '@angular/core';

import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    const expectedRole = route.data.expectedRole;
    
    if (this.localStorageService.isAuthenticated() || !expectedRole.includes(this.localStorageService.role())) {
      this.localStorageService.deleteToken();
      this.router.navigate(['LogIn']);
      return false;
    }
    return true;
  }
}
