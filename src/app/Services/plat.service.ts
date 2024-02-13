import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root',
})
export class PlatService {
  private menuUrl = apiUrl + '/auth/menu';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getMenus(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.menuUrl}/list`, { headers });
  }
  
  addMenu(newmenu: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.menuUrl}/store`, { titre : newmenu}, { headers });
  }

  editMenu(menuId: string, newTitre: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.menuUrl}/update/${menuId}`, { titre: newTitre }, { headers });
  }

  getMenu(menuId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.menuUrl}/show/${menuId}`, { headers });
  }

  deleteMenu(menuId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.menuUrl}/delete/${menuId}`, { headers });
  }
  
    
  }
