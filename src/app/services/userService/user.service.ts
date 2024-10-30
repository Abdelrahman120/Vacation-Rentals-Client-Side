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
    if (!user_id || !token) {
      throw new Error('User ID or Token is missing');
    }
    return this.http.get<UserInfo>(
      `${this.BACKEND_API}/api/bookings/${user_id}`,
      {
        headers,
      }
    );
  }

  getOwnerById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.BACKEND_API}/api/booking/owner-details/${id}`
    );
  }
}
