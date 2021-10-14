import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-meniu',
  templateUrl: './meniu.component.html',
  styleUrls: ['./meniu.component.css']
})
export class MeniuComponent implements OnInit {
  isLoggIn: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.isAdmin = this.localStorage.role() === 'Admin';
    this.isLoggIn = this.localStorage.token !== null;
    this.localStorage.watchStorage().subscribe((data: string) => {
      this.isLoggIn = data !== "deleted";
      this.isAdmin = this.localStorage.role() === 'Admin';
   })
  }

  logOut(){
    this.localStorage.deleteToken();
    this.router.navigate(['LogIn']);
  }
}
