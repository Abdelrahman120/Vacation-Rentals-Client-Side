import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../user-info';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  BACKEND_API = environment.BACKEND_URL;

  private url = `${this.BACKEND_API}/api/user/payments`;

  constructor(private http: HttpClient) { }

  getUserInfo(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UserInfo>(this.url, { headers });
  }
}
