import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrl } from './apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);
  userRole = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get usersRole(): Observable<string> {
    return this.userRole.asObservable();
  }
  login(name: string, password: string): Observable<any> {
    const loginUrl = `${apiUrl}/user/login`;
    const credentials = { name, password };
  
    return this.http.post(loginUrl, credentials);
  }

  register(name: string, email: string, phone: string, password: string): Observable<any> {
    const registerUrl = `${apiUrl}/user/register`;
    const userData = { name, email, phone, password };

    return this.http.post(registerUrl, userData);
  }

  logout(): void {
    this.loggedIn.next(false);
    this.userRole.next('');
  }
}
