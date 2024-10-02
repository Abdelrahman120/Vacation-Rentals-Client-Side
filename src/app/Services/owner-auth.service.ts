import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import {  catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerAuthService {

  constructor(private router: Router,private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object,) { }

  private apiUrl = 'http://127.0.0.1:8000/api';
  private tokenKey = 'owner_auth_token';
  private roleKey = 'user_role'; 

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register/owner`, userData).pipe(
      catchError(this.handleError)
    );
  }
  getCurrentUser() {
    const token = localStorage.getItem(this.tokenKey);
    const role = localStorage.getItem(this.roleKey);
    
    if (token) {
      return {
        token: token,
        role: role,
      };
    }

    return null; // User is not logged in
  }
  login(credentials: any): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login/owner`, credentials).pipe(
      map((response: any) => {
        console.log('Login successful:', response);
        
        if (response && response.data.token) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.tokenKey, response.data.token); // Store the token
            localStorage.setItem(this.roleKey, response.data.role);  // Store the user role (admin or owner)
          }
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return of(false);
      })
    );
  }

  logout(): Observable<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError('localStorage is not available on the server side');
    }
  
    const token = localStorage.getItem(this.tokenKey);
    console.log('Token being sent for logout:', token);  // Log the token for debugging
  
    if (!token) {
      return throwError('No token found');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/logout/owner`, {}, { headers }).pipe(
      map(response => {
        console.log('Logout successful:', response);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem(this.tokenKey);
        }
        this.router.navigate(['/login']);
        return response;
      }),
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

forgetPassword(email: any): Observable<any> {
  return this.http.post<any>('http://127.0.0.1:8000/api/owners/password/email', { email }).pipe(
    catchError(this.handleError)
  );
}
resetPassword(email: any, token: any, password: any, password_confirmation: any): Observable<any> {
  return this.http.post<any>('http://127.0.0.1:8000/api/owners/password/reset', {email, token, password, password_confirmation }).pipe(
    catchError(this.handleError)
  );

}
}