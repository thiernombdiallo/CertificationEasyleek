// auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(username: string, password: string): void {
    const loginUrl = `${apiUrl}/login`;  
    this.loggedIn.next(true);
  }

  register(username: string, email: string, phoneNumber: string, password: string): void {
    const registerUrl = `${apiUrl}/register`; 
  }

  logout(): void {
    this.loggedIn.next(false);
  }
}
