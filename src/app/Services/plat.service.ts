import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root',
})
export class PlatService {
  private platsUrl = apiUrl +'/auth/plat';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getPlats(): Observable<any> {
    return this.http.get(`${this.platsUrl}/list`, { headers: this.getHeaders() });
  }

  getPlatDetails(id: number): Observable<any> {
    return this.http.get(`${this.platsUrl}/show/${id}`, { headers: this.getHeaders() });
  }

  getPlatsByRestaurant(): Observable<any> {
    return this.http.get(`${this.platsUrl}/list/restaurant`, { headers: this.getHeaders() });
  }

  ajouterPlat(platData: any): Observable<any> {
    return this.http.post(`${this.platsUrl}/store`, platData, { headers: this.getHeaders() });
  }

  modifierPlat(platId: number, platData: any): Observable<any> {
    return this.http.put(`${this.platsUrl}/update/${platId}`, platData, { headers: this.getHeaders() });
  }

  archiverPlat(platId: number): Observable<any> {
    return this.http.patch(`${this.platsUrl}/archiver/${platId}`, {}, { headers: this.getHeaders() });
  }

  desarchiverPlat(platId: number): Observable<any> {
    return this.http.patch(`${this.platsUrl}/desarchiver/${platId}`, {}, { headers: this.getHeaders() });
  }

  supprimerPlat(platId: number): Observable<any> {
    return this.http.delete(`${this.platsUrl}/delete/${platId}`, { headers: this.getHeaders() });
  }
}
