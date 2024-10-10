import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from '../../user-info';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  BACKEND_API = environment.BACKEND_URL;
  constructor(private http: HttpClient) {}

  getBookings(): Observable<UserInfo> {
    const user_id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<UserInfo>(
      `${this.BACKEND_API}/api/bookings/${user_id}`,
      {},
      {
        headers,
      }
    );
  }
}
