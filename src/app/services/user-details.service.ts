import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserId } from '../User/user-id';
import { UserPayments } from '../User/user-payments';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private apiUrl = 'http://127.0.0.1:8000/api/users'; 
  private Url = 'http://localhost:8000/api/user/payments'; 
  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<UserId> {
    return this.http.get<UserId>(`${this.apiUrl}/${id}`);
  }
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}` 
  });
  getUserWithPayments(): Observable<UserPayments> {
    return this.http.get<UserPayments>(`${this.Url}`, { headers: this.headers });
  }
}
