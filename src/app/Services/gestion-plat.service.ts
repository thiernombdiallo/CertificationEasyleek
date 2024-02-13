import { Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionPlatService {
  
  private platsUrl = apiUrl +'/auth/plat';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log("message ",token)
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }


  // Plat
  getPlatsForMenu(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.platsUrl}/list/restaurant`, { headers });
  }


  // test addplat
  addPlat(platAdd: any): Observable<any> {
    const headers = this.getHeaders();
    console.log(headers, "token");
    
    console.log("Données d'inscription :", platAdd);

    return this.http.post<any>(`${this.platsUrl}/store`, platAdd, { headers }).pipe(
      tap((response) => {
        console.log("Réponse de l'API après inscription :", response);
      }),
      catchError((error) => {
        console.error("Erreur lors de l'inscription :", error);
        throw error;
      })
    );
  }
  ajouterPlat(plat : any) : Observable<any>{
    const headers = this.getHeaders();

    return this.http.post<any>(`${this.platsUrl}/store`, plat , { headers })
  }

  // addPlat(formdata: any): Observable<any> {
  //   const headers = this.getHeaders();
  //   console.log(headers, "token");

    
  //   return this.http.post<any>(`${this.platsUrl}/store`, formdata, { headers });
  // }
  
  editPlat(platId: string, newNom: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.platsUrl}/update/${platId}`, { nom: newNom }, { headers });
  }

  deletePlat(platId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.platsUrl}/delete/${platId}`, { headers });
  }
}
