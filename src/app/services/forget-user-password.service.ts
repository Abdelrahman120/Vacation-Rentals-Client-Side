import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetUserPasswordService {

  constructor(private http: HttpClient) { }


  forgetPassword(email: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/password/email', { email }).pipe(
      catchError(this.handleError)
    );
  }
  resetPassword(email: any, token: any, password: any, password_confirmation: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/password/reset', {email, token, password, password_confirmation }).pipe(
      catchError(this.handleError)
    );
  
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client Error: ${error.error.message}`;
    } else {
        // Server-side error
        if (error.error && error.error.errors) {
            // If there are validation errors from the server
            const validationErrors = error.error.errors;
            console.error('Validation errors:', validationErrors);
            errorMessage = `Validation failed. See console for details.`;
        } else {
            // Fallback for other types of server errors
            errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
            console.error('Detailed server error:', error.error);
        }
    }

    return throwError(errorMessage); // Return the error message for further handling
}
}
