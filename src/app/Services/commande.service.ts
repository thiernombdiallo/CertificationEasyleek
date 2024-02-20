import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private platsUrl= apiUrl

  constructor(private http: HttpClient ,) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
  
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }

  getRestoCommandes(platId :string): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.platsUrl}/auth/commande/plat/list/{plat_id}${platId}` , { headers });
  }
}
