import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private apiUrl = 'http://127.0.0.1:8000/api/users'; 
  private Url = 'http://localhost:8000/api/user/payments'; 
  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}` 
  });
  getUserWithPayments(): Observable<any> {
    return this.http.get(`${this.Url}`, { headers: this.headers });
  }
}
