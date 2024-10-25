import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OwnerAuthService } from '../Services/owner-auth.service';
import { AdminOwners } from '../Admin/admin-owners';
import { AdminUsers } from '../Admin/admin-users';
import { AdminProperties } from '../Admin/admin-properties';
import { AdminPropertiesDetails } from '../Admin/admin-properties-details';
import { AdminOwnerDetails } from '../Admin/admin-owner-details';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminServices {
  constructor(
    private http: HttpClient,
    private authService: OwnerAuthService
  ) {}

  private BACKEND_API = environment.BACKEND_URL;

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('owner_auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getUsers(): Observable<AdminUsers> {
    return this.http.get<AdminUsers>(`${this.BACKEND_API}/api/admin/users`, {
      headers: this.getAuthHeaders(),
    });
  }

  getOwners(): Observable<AdminOwners> {
    return this.http.get<AdminOwners>(`${this.BACKEND_API}/api/admin/owners`, {
      headers: this.getAuthHeaders(),
    });
  }

  getUsersUsingPagination(pageNumber: number): Observable<AdminUsers> {
    return this.http.get<AdminUsers>(
      `${this.BACKEND_API}/api/admin/users?page=${pageNumber}&limit=12`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  getOwnersUsingPagination(pageNumber: number): Observable<AdminOwners> {
    return this.http.get<AdminOwners>(
      `${this.BACKEND_API}/api/admin/owners?page=${pageNumber}&limit=20`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  // getProperties(): Observable<any> {
  //   return this.http.get(`${this.url}/properties`, { headers: this.getAuthHeaders() });
  // }
  acceptProperty(id: number): Observable<any> {
    return this.http.post(
      `${this.BACKEND_API}/api/properties/${id}/accept`,
      {}
    );
  }
  rejectProperty(id: number): Observable<any> {
    return this.http.post(
      `${this.BACKEND_API}/api/properties/${id}/reject`,
      {}
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.BACKEND_API}/api/admin/deleteuser/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteOwner(id: number): Observable<any> {
    return this.http.delete(`${this.BACKEND_API}/api/admin/deleteowner/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getProperties(status?: string): Observable<AdminProperties> {
    let url = `${this.BACKEND_API}/api/admin/properties`;

    if (status) {
      url += `?status=${status}`;
    }
    return this.http.get<AdminProperties>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  getPropertiesUsingPagination(
    pageNumber: number,
    status?: string
  ): Observable<AdminProperties> {
    let url = `${this.BACKEND_API}/api/admin/properties?page=${pageNumber}&limit=9`;

    if (status) {
      url += `&status=${status}`;
    }
    return this.http.get<AdminProperties>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  getPropertyDetails(id: number): Observable<AdminPropertiesDetails> {
    return this.http.get<AdminPropertiesDetails>(
      `${this.BACKEND_API}/api/admin/properties/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }
  updatePropertyStatus(id: number, formData: FormData): Observable<any> {
    return this.http.post(
      `${this.BACKEND_API}/api/admin/properties/${id}/update-status`,
      formData,
      { headers: this.getAuthHeaders() }
    );
  }
  sendEmail(id: number, formData: FormData): Observable<any> {
    return this.http.post(
      `${this.BACKEND_API}/api/admin/send-email/${id}`,
      formData,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
  showOwner(id: number): Observable<any> {
    return this.http.get(`${this.BACKEND_API}/api/admin/showowner/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
  getOwnerDetails(ownerId: string): Observable<AdminOwnerDetails> {
    return this.http.get<AdminOwnerDetails>(
      `${this.BACKEND_API}/api/admin/owner/${ownerId}`
    );
  }
  getPayments() {
    return this.http.get(`${this.BACKEND_API}/api/admin/payments`, {
      headers: this.getAuthHeaders(),
    });
  }
}
