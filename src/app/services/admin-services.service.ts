import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  constructor( private http: HttpClient) { }
  private url = 'http://127.0.0.1:8000/api/admin';

  getUsers(): Observable<any> {
    return this.http.get(`${this.url}/users`);
  }

  // Fetch owners from API
  getOwners(): Observable<any> {
    return this.http.get(`${this.url}/owners`);
  }

  // Fetch properties from API
  getProperties(): Observable<any> {
    return this.http.get(`${this.url}/properties`);
  }
}
