import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'http://127.0.0.1:8000/'

  constructor(private http: HttpClient) { }

  userLogin(loginForm: any): Observable<any> {
    return this.http.post(this.baseUrl + 'user/login',loginForm)
  }
}

