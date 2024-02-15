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
   // Obtenir la liste des plats
  //  getPlats(): Observable<any[]> {
  //   const headers = this.getHeaders();
  //   return this.http.get<any[]>(`${this.platsUrl}/list/restaurant`, { headers }).pipe(
  //     catchError((error) => {
  //       console.error('Error in getPlats:', error);
  //       throw error;
  //     })
  //   );
  // }

  getPlatsForMenu(menuId: string): Observable<any[]> {
            const headers = this.getHeaders();
            return this.http.get<any[]>(`${this.platsUrl}/list/restaurant/${menuId}`, { headers }).pipe(
              catchError((error) => {
                console.error('Error in getPlatsForMenu:', error);
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

  updatePlat(platId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.platsUrl}/update/${platId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error in getPlatsForMenu:', error);
        throw error;
      })
    );
  }

  
  getSinglePlat(platId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.platsUrl}/show/${platId}`, { headers });
  }
}

 // addPlat(platAdd: any): Observable<any> {
  //   const headers = this.getHeaders();
  //   console.log(headers, "token");
  //   console.log("Données d'inscription :", platAdd);

  //   return this.http.post(`${this.platsUrl}/store`, platAdd, { headers }).pipe(
  //       tap(
  //           response => console.log("Réponse de l'API après inscription :", response),
  //           error => console.error("Erreur lors de la requête POST :", error)
  //           )
  //           );
  //         }
// Route::get('/plat/list/restaurant/{menu}', [PlatController::class, 'indexRestaurant']);
//     Route::post('/plat/store', [PlatController::class, 'store']);
//     Route::put('/plat/update/{id}', [PlatController::class, 'update']);
//     Route::patch('/plat/archiver/{id}', [PlatController::class, 'archiver']);
//     Route::patch('/plat/desarchiver/{id}', [PlatController::class, 'desarchiver']);
//     Route::get('/plat/show/{id}', [PlatController::class, 'show']);
//     Route::delete('/plat/delete/{id}', [PlatController::class, 'destroy']);
// test addplat
// addPlat(platAdd: any): Observable<any> {
//   const headers = this.getHeaders();
//   console.log(headers, "token");
  
//   console.log("Données d'inscription :", platAdd);

//   return this.http.post<any>(`${this.platsUrl}/store`, platAdd, { headers }).pipe(
//     tap((response:any) => {
//       console.log("Réponse de l'API après inscription :", response);
//     }),
//   );
// }
