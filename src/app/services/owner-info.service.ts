import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OwnerInfo } from '../owner-info';

@Injectable({
  providedIn: 'root'
})
export class OwnerInfoService {

  private url = 'http://127.0.0.1:8000/api/owner/details';

  constructor(private http: HttpClient) { }

  getOwnerInfo(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<OwnerInfo>(this.url, { headers });
  }
}
