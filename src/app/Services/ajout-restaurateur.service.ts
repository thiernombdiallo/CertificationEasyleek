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

  getListeRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(this.restaurantApi, { headers: this.getHeaders() });
  }

  getListeRestaurateurs(): Observable<any[]> {
    // Ajoutez le point de terminaison pour récupérer les utilisateurs avec rôle_id: 2
    const restaurateursUrl = apiUrl + '/user?role=${role_id=2}';
    return this.http.get<any[]>(restaurateursUrl, { headers: this.getHeaders() });
  }  

  ajouterRestaurateur(newrestaurateur: string): Observable<any> {
    return this.http.post(`${this.restaurantApi}/auth/restaurant/register`, { type: newrestaurateur }, { headers: this.getHeaders() });
    
  }
}
