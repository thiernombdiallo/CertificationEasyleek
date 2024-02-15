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
  getListeRestaurateursBloquer(): Observable<any[]> {
    const restaurateurBloquersUrl = apiUrl + '/auth/restaurant/list/blocked';
    return this.http.get<any[]>(restaurateurBloquersUrl, { headers: this.getHeaders() });
  }  

  activerRestaurant(id: string): Observable<any> {
    const unblockUrl = `${apiUrl}/auth/restaurant/compte/unblock/${id}`;
    return this.http.post(unblockUrl, {}, { headers: this.getHeaders() });
  }

  getRestaurantDetails(id: string): Observable<any> {
    const detailsUrl = `${apiUrl}/auth/restaurant/details/${id}`;
    return this.http.get(detailsUrl, { headers: this.getHeaders() });
}
 

  getListeRestaurateursActive(): Observable<any[]> {
    const restaurateursUnblockUrl = apiUrl + '/auth/restaurant/list/unblocked';
    return this.http.get<any[]>(restaurateursUnblockUrl, { headers: this.getHeaders() });
  }  

  // Route::post('/restaurant/register', [UserController::class, 'restaurantRegister']);
  // Route::post('/restaurant/details/{id}', [UserController::class, 'voirRestaurantDetails']);
  // Route::post('/restaurant/compte/block/{id}', [UserController::class, 'blockRestaurant']);
  // Route::post('/restaurant/compte/unblock/{id}', [UserController::class, 'unblockRestaurant']);
  // Route::get('/restaurant/list/blocked', [UserController::class, 'listRestaurantBlocked']);
  // Route::get('/restaurant/list/unblocked', [UserController::class, 'listRestaurantUnblocked']);
  // Route::get('/restaurant/list/all', [UserController::class, 'listAllRestaurant']);


}
