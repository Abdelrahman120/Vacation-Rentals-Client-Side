import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OwnerProfileService {
  private apiUrl = 'http://localhost:8000/api/owners';
  private Url = 'http://localhost:8000/api/owner';
  private baseUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}

  getOwner(ownerId: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/${ownerId}`)
      .pipe(catchError(this.handleError));
  }

  getOwnerDetails(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('owner_auth_token')}`  // Assuming the token is stored in localStorage
    });
    // console.log('Using token:', `${localStorage.getItem('owner_auth_token')}`); // Debug the token value
    return this.http.get<any>(this.Url, { headers });
  }

  updateOwner(ownerId: number, data: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/${ownerId}`, data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }
  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/properties/${id}`);
  }
}
