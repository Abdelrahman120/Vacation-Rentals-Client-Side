import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OwnerAuthService } from '../Services/owner-auth.service';
import { AdminOwners } from '../Admin/admin-owners';
import { AdminUsers } from '../Admin/admin-users';
import { AdminProperties } from '../Admin/admin-properties';
import { AdminPropertiesDetails } from '../Admin/admin-properties-details';
import { AdminOwnerDetails } from '../Admin/admin-owner-details';

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

  getUsers(): Observable<AdminUsers> {
    return this.http.get<AdminUsers>(`${this.url}/users`, { headers: this.getAuthHeaders() }); 
  }

  // Fetch owners from API
  getOwners(): Observable<AdminOwners> {
    return this.http.get<AdminOwners>(`${this.url}/owners`, { headers: this.getAuthHeaders() }); 
  }

  // Fetch properties from API
  // getProperties(): Observable<any> {
  //   return this.http.get(`${this.url}/properties`, { headers: this.getAuthHeaders() }); 
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

  getProperties(status?: string): Observable<AdminProperties> {
    let url = `${this.url}/properties`;
    if (status) {
      url += `?status=${status}`;
    }
    return this.http.get<AdminProperties>(url, { headers: this.getAuthHeaders() });
  }

  getPropertyDetails(id: number): Observable<AdminPropertiesDetails> {
    return this.http.get<AdminPropertiesDetails>(`${this.url}/properties/${id}`, { headers: this.getAuthHeaders() });
  }
  updatePropertyStatus(id: number, formData: FormData): Observable<any> {
   
    return this.http.post(`${this.url}/properties/${id}/update-status`, formData, { headers: this.getAuthHeaders() });
  }
  sendEmail(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.url}/send-email/${id}`, formData, { headers: this.getAuthHeaders() });
  }
  showowner(id: number): Observable<any> {
    return this.http.get(`${this.url}/showowner/${id}`, { headers: this.getAuthHeaders() });
}
  getOwnerDetails(ownerId: string): Observable<AdminOwnerDetails> {
    return this.http.get<AdminOwnerDetails>(`${this.url}/owner/${ownerId}`);
  }}
