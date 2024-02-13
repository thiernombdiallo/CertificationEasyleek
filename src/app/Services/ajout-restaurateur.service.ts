import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AjoutRestaurateurService {
  private restaurantApi = apiUrl;
  
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    } else {
      console.error('Token non disponible.');
      throw new Error('Token non disponible.');
    }
  }

  getListeRestaurateurs(): Observable<any[]> {
    const restaurateursUrl = apiUrl + '/auth/restaurant/list/all';
    return this.http.get<any[]>(restaurateursUrl, { headers: this.getHeaders() });
  }  

  ajouterRestaurateur(name: string, email: string, adresse: string, phone: string, password: string, categorie_id:string): Observable<any> {
    const registerUrl = `${apiUrl}/auth/restaurant/register`;
    const userData = { name, email, adresse, phone, password , categorie_id};
    return this.http.post(registerUrl, userData ,{ headers: this.getHeaders() });
  }
  desactiverRestaurant(id: string): Observable<any> {
    const blockUrl = `${apiUrl}/auth/restaurant/compte/block/${id}`;
    return this.http.post(blockUrl, {}, { headers: this.getHeaders() });
  }
  unblockRestaurant(id: string): Observable<any> {
    const unblockUrl = `${apiUrl}/auth/restaurant/compte/unblock/${id}`;
    return this.http.post(unblockUrl, {}, { headers: this.getHeaders() });
  }

  getRestaurantDetails(id: string): Observable<any> {
    const detailsUrl = `${apiUrl}/auth/restaurant/details/${id}`;
    return this.http.post(detailsUrl, {}, { headers: this.getHeaders() });
  }
}
