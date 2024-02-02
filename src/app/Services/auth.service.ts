import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrl } from './apiUrl';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);
  userRole = new BehaviorSubject<string>('');
  user: any;
  constructor(private http: HttpClient, private router: Router) { }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get usersRole(): Observable<string> {
    return this.userRole.asObservable();
  }
  login(email: string, password: string): Observable<any> {
    const loginUrl = `${apiUrl}/user/login`;
    const credentials = { email, password };
    return this.http.post(loginUrl, credentials);
  }

  register(name: string, email: string, adresse: string, phone: string, password: string,): Observable<any> {
    const registerUrl = `${apiUrl}/user/register`;
    const userData = { name, email, adresse, phone, password };
    return this.http.post(registerUrl, userData);
  }

  logout(): void {
    this.loggedIn.next(false);
    this.userRole.next('');
  }
 
}
