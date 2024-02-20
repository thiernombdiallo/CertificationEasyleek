import { Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GestionPlatService {
  
  private platsUrl = apiUrl +'/auth/plat';
  private platsUrlSimple = apiUrl;
  
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
  getPlatsForMenu(menuId: string): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.platsUrl}/list/restaurant/${menuId}`, { headers }).pipe(
        catchError((error) => {
            console.error('Erreur dans getPlatsForMenu :', error);
            throw error; 
        })
    );
}
      
 ajouterPlat(formData : any) : Observable<any>{
    const headers = this.getHeaders();

    return this.http.post<any>(`${this.platsUrl}/store`, formData , { headers })
  } 	
  deletePlat(platId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.platsUrl}/delete/${platId}`, { headers });
  }

  // updatePlat(platId: string): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.http.put<any>(`${this.platsUrl}/update/${platId}`, { headers }).pipe(
  //     catchError((error) => {
  //       console.error('Error in getPlatsForMenu:', error);
  //       throw error;
  //     })
  //     );
  // }
  updatePlat(platId: string, updatedPlat: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.platsUrl}/update/${platId}`, updatedPlat, { headers }).pipe(
      catchError((error) => {
        console.error('Error in updatePlat:', error);
        throw error;
      })
    );
  }
  

  getSinglePlat(platId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.platsUrl}/show/${platId}`, { headers });
  }
  
  getSinglePlatUtilisateur(platId: string): Observable<any> {
    return this.http.get<any>(`${this.platsUrlSimple}/plat/show/${platId}`);
  }
  getPlatsForMenuUtilisateur(menuId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.platsUrlSimple}/plat/list/${menuId}`);
  }
  }

  
  
