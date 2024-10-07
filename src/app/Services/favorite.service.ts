import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private apiUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}
  addToFavorites(propertyId: number) {
    const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
    return this.http.post(`${this.apiUrl}/favorites`, { property_id: propertyId } ,{ headers });
  }
  removeFromFavorites(propertyId: number) {
    const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
    return this.http.delete(`${this.apiUrl}/favorites/${propertyId}`,  { headers });
  }
  getUserFavorites() {
    const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
    return this.http.get(`${this.apiUrl}/favorites`,{ headers });
  }
 
  getReviews(property_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/properties/${property_id}/reviews`);
  }
 addReview(payload: any) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.post(`${this.apiUrl}/reviews` , payload , { headers })  
  .pipe(catchError(this.handleError));
 }

 deleteReview(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/reviews/${id}`) 
   .pipe(catchError(this.handleError));
  ;
}

togleFavorite(propertyId: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.post(`${this.apiUrl}/favorites/toggle`, { property_id: propertyId }, { headers })
    .pipe(catchError(this.handleError));
}

private handleError(error: any): Observable<never> {
  console.error('An error occurred:', error);
  return throwError(error);
}
}
