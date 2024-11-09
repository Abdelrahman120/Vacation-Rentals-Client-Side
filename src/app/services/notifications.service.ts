import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

private apiUrl = 'http://localhost:8000/api/notifications'; 
private url = 'http://localhost:8000/api/owner/notifications';
private urls = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }


  getUnreadNotificationsCount(): Observable<any> {
    return this.http.get(`${this.urls}/admin/notifications/unread`);
  }

  markNotificationAsRead(id: any): Observable<any> {
    return this.http.post(`${this.urls}/notifications/${id}/mark-as-read`, {});
  }

  // for owner notifications 
  markOwnerNotificationAsRead(notificationId: string): Observable<any> {
    return this.http.post(`${this.urls}/owner/notifications/${notificationId}/mark-as-read`, {});
  }


  getOwnerUnreadNotificationsCount(): Observable<any> {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    return this.http.get(`${this.urls}/owner/notifications/unread`, {headers});
  }


  // end owner notifications 

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

