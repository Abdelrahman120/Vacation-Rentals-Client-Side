import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

private apiUrl = 'http://localhost:8000/api/notifications'; 
private url = 'http://localhost:8000/api/owner/notifications';
  constructor(private http: HttpClient) { }

  getNotifications(): Observable<any> {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    return this.http.get<any>(this.apiUrl, {headers});
}

getNotificationsForOwner(): Observable<any> {
  const token = localStorage.getItem('owner_auth_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  })
  return this.http.get(this.url, {headers});
}
}

