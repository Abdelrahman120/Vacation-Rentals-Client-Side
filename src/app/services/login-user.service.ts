import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  private url = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { email, password });
}

logout(): Observable<any> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.post(`${this.url}/logout`, {} , { headers });
}
}
