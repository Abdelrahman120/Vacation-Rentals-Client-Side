import { isPlatformBrowser } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OwnerAuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private apiUrl = 'http://127.0.0.1:8000/api';
  private tokenKey = 'owner_auth_token';
  private roleKey = 'role';

  register(userData: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register/owner`, userData)
      .pipe(catchError(this.handleError));
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

    return null;
  }
  login(credentials: any): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login/owner`, credentials).pipe(
      map((response: any) => {
        console.log('Login successful:', response);

        if (response && response.data.token) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.tokenKey, response.data.token);
            localStorage.setItem(this.roleKey, response.data.role);
            localStorage.setItem('ownerid', response.data.id);
          }
          return true;
        }
        return false;
      })
    );
  }

  logout(): Observable<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError('localStorage is not available on the server side');
    }

    const token = localStorage.getItem(this.tokenKey);
    console.log('Token being sent for logout:', token);

    if (!token) {
      return throwError('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .post<any>(`${this.apiUrl}/logout/owner`, {}, { headers })
      .pipe(
        map((response) => {
          console.log('Logout successful:', response);
          localStorage.setItem('ownerid', response.data.id);

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
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      if (error.error && error.error.errors) {
        const validationErrors = error.error.errors;
        console.error('Validation errors:', validationErrors);
        errorMessage = `Validation failed. See console for details.`;
      } else {
        errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
        console.error('Detailed server error:', error.error);
      }
    }

    return throwError(errorMessage);
  }

  forgetPassword(email: any): Observable<any> {
    return this.http
      .post<any>('http://127.0.0.1:8000/api/owners/password/email', { email })
      .pipe();
  }
  resetPassword(
    email: any,
    token: any,
    password: any,
    password_confirmation: any
  ): Observable<any> {
    return this.http
      .post<any>('http://127.0.0.1:8000/api/owners/password/reset', {
        email,
        token,
        password,
        password_confirmation,
      })
      .pipe(catchError(this.handleError));
  }
}
