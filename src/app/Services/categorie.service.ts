import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { apiUrl } from './apiUrl';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private categorieUrl = apiUrl ;

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
  addcategorie(newcategorie: string): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(`${this.categorieUrl}/auth/categorie/store`, { type: newcategorie }, { headers: headers })
      .pipe(
        catchError((error) => {
          console.error("Erreur HTTP lors de l'ajout de catégorie :", error);
          throw error;
        })
      );
  }
    getAllCategories(): Observable<any[]> {
      const headers = this.getHeaders();
      return this.http.get<any[]>(`${this.categorieUrl}/categorie/list`, { headers: headers });
    }
    
  deletecategorie(categorieId: number): Observable<any> {
      const headers = this.getHeaders();
    return this.http.delete(`${this.categorieUrl}/auth/categorie/delete/${categorieId}`, { headers });
  }
  
  editcategorie(categorieId: number, newType: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.categorieUrl}/auth/categorie/update/${categorieId}`, { type: newType }, { headers });
  }
  getSingleCategory(categorieId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.categorieUrl}/auth/categorie/show/${categorieId}`, { headers: headers });
  }
}