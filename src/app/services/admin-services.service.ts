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
    const token = localStorage.getItem('owner_auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
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
  // getProperties(): Observable<any> {
  //   return this.http.get(`${this.url}/properties`, { headers: this.getAuthHeaders() }); // Add headers
  // }
  acceptProperty(id: number): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/properties/${id}/accept`, {});
  }
  rejectProperty(id: number): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/properties/${id}/reject`, {});
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/deleteuser/${id}`, { headers: this.getAuthHeaders() });
  }

  deleteOwner(id: number): Observable<any> {
    return this.http.delete(`${this.url}/deleteowner/${id}`, { headers: this.getAuthHeaders() });
  }

  getProperties(status?: string): Observable<any> {
    let url = `${this.url}/properties`;
    if (status) {
      url += `?status=${status}`;
    }
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  getPropertyDetails(id: number): Observable<any> {
    return this.http.get(`${this.url}/properties/${id}`, { headers: this.getAuthHeaders() });
  }
  updatePropertyStatus(id: number, formData: FormData): Observable<any> {
   
    return this.http.post(`${this.url}/properties/${id}/update-status`, formData, { headers: this.getAuthHeaders() });
  }
  sendEmail(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.url}/send-email/${id}`, formData, { headers: this.getAuthHeaders() });
  }
  showowner(id: number): Observable<any> {
    return this.http.get(`${this.url}/showowner/${id}`, { headers: this.getAuthHeaders() });
}}
