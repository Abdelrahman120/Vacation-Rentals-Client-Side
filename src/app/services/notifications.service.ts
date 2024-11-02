import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

private apiUrl = 'http://localhost:8000/api/notifications'; // Adjust the URL accordingly

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<any> {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    return this.http.get<any>(this.apiUrl, {headers});
}
}
