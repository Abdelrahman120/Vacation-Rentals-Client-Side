import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../user-info';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private url = 'http://127.0.0.1:8000/api/user/payments';

  constructor(private http: HttpClient) { }

  getUserInfo(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UserInfo>(this.url, { headers });
  }
}
