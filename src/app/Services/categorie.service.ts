import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { apiUrl } from './apiUrl';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private categorieUrl = apiUrl ;

  constructor(private http: HttpClient) {}

  addcategorie(newcategorie: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3VzZXIvbG9naW4iLCJpYXQiOjE3MDY4NjU4NTgsImV4cCI6MTcwNjg2OTQ1OCwibmJmIjoxNzA2ODY1ODU4LCJqdGkiOiJUdkJzMzlseTlYOFlHWERUIiwic3ViIjoiNyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.G9wPcw17IE91quY8LInrauuj34ETsM7-G00ZPqj-0Og'
    });
    
    return this.http.post(`${this.categorieUrl}/auth/categorie/store`, { type: newcategorie }, { headers: headers })
      .pipe(
        catchError((error) => {
          console.error("Erreur HTTP lors de l'ajout de catégorie :", error);
          throw error; // Assurez-vous de rejeter l'erreur pour que le composant puisse la gérer
        })
      );
  }

  getAllCategories(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3VzZXIvbG9naW4iLCJpYXQiOjE3MDY4NjU4NTgsImV4cCI6MTcwNjg2OTQ1OCwibmJmIjoxNzA2ODY1ODU4LCJqdGkiOiJUdkJzMzlseTlYOFlHWERUIiwic3ViIjoiNyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.G9wPcw17IE91quY8LInrauuj34ETsM7-G00ZPqj-0Og'
    });
    return this.http.get<any[]>(`${this.categorieUrl}/categorie/list` ,{ headers: headers });

  }

  editcategorie(categorieId: number, newType: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3VzZXIvbG9naW4iLCJpYXQiOjE3MDY4NjU4NTgsImV4cCI6MTcwNjg2OTQ1OCwibmJmIjoxNzA2ODY1ODU4LCJqdGkiOiJUdkJzMzlseTlYOFlHWERUIiwic3ViIjoiNyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.G9wPcw17IE91quY8LInrauuj34ETsM7-G00ZPqj-0Og'
    });
    return this.http.put(`${this.categorieUrl}/auth/categorie/update/${categorieId}`, { type: newType }, { headers });
  }
  getSingleCategory(categorieId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3VzZXIvbG9naW4iLCJpYXQiOjE3MDY4NjU4NTgsImV4cCI6MTcwNjg2OTQ1OCwibmJmIjoxNzA2ODY1ODU4LCJqdGkiOiJUdkJzMzlseTlYOFlHWERUIiwic3ViIjoiNyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.G9wPcw17IE91quY8LInrauuj34ETsM7-G00ZPqj-0Og'
    });
    return this.http.get<any>(`${this.categorieUrl}/categorie/${categorieId}`, { headers: headers });
  }
  

  deletecategorie(categorieId: number): Observable<any> {
    return this.http.delete(`${this.categorieUrl}/auth/categorie/delete/${categorieId}`);
  }
}
