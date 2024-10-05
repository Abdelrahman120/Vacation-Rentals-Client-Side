import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OwnerProfileService {
  private apiUrl = 'http://localhost:8000/api/owners';

  constructor(private http: HttpClient) {}

  getOwner(ownerId: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/${ownerId}`)
      .pipe(catchError(this.handleError));
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
}
