import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OwnerAuthService } from '../Services/owner-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  constructor(private http: HttpClient, private authService: OwnerAuthService) { }
  
  private url = 'http://127.0.0.1:8000/api/admin';

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('owner_auth_token'); // Replace with your actual token key
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Include the token in the Authorization header
    });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.url}/users`, { headers: this.getAuthHeaders() }); // Add headers
  }
  
  // Fetch owners from API
  getOwners(): Observable<any> {
    return this.http.get(`${this.url}/owners`, { headers: this.getAuthHeaders() }); // Add headers
  }

  // Fetch properties from API
  getProperties(): Observable<any> {
    return this.http.get(`${this.url}/properties`, { headers: this.getAuthHeaders() }); // Add headers
  }
  acceptProperty(id: number): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/properties/${id}/accept`,{});
  }
  rejectProperty(id: number): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/properties/${id}/reject`,{});
  }
}
