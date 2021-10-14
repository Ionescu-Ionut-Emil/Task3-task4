import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class GeneralService {

  token: any;
  apiUrl: string;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.apiUrl = environment.apiUrl;
  }


  getApiUrl() {
    if (!!this.apiUrl === false) {
      this.apiUrl = environment.apiUrl;
    }
  }

  getBase<T>(url: string, params?: string): Observable<any> {
    this.getApiUrl();
    return this.http
      .get(this.apiUrl + url)
  }

  postBase<T>(url: string, data: any): Observable<any> {
    this.getApiUrl();
    return this.http
      .post(this.apiUrl + url, data)
  }

  putBase<T>(url: string, data: any): Observable<any> {
    this.getApiUrl();
    return this.http
      .put(this.apiUrl + url, data)
  }

  deleteBase<T>(url: string, data?: any): Observable<any> {
    this.getApiUrl();
    return this.http
      .delete(this.apiUrl + url, data)
  }
}
