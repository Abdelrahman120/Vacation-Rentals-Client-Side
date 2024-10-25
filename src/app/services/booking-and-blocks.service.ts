import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BookingAndBlocksService {
  BACKEND_URL = environment.BACKEND_URL;
  private API = `${this.BACKEND_URL}/api/`;

  constructor(private http: HttpClient) {}

  getBlocks(id: string): Observable<any[]> {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`${this.API}property/${id}/get-blocks`, {
      headers,
    });
  }

  getBookings(id: string): Observable<any[]> {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`${this.API}property/${id}/bookings`, {
      headers,
    });
  }

  addBlock(id: string, dates: { start_date: string; end_date: string }) {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any[]>(`${this.API}property/${id}/add-block`, dates, {
      headers,
    });
  }

  getEvents(id: string): Observable<any[]> {
    return forkJoin([this.getBlocks(id), this.getBookings(id)]);
  }

  removeBlock(propertyId: string, blockId: string): Observable<any[]> {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any[]>(
      `${this.API}property/${propertyId}/block/${blockId}`,
      {
        headers,
      }
    );
  }
}
