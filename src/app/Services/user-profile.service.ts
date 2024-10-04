import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateUser(userId: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:8000/api/users/${userId}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }
}
