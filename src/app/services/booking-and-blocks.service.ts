import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, of } from 'rxjs';
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

  // getEvents(id: string): Observable<any[]> {
  //   return forkJoin([this.getBlocks(id), this.getBookings(id)]);
  // }

  getEvents(id: string): Observable<any[]> {
    return forkJoin([
      this.getBlocks(id).pipe(
        catchError((error) => {
          console.error('Error fetching blocks:', error);
          return of([]);
        })
      ),
      this.getBookings(id).pipe(
        catchError((error) => {
          console.error('Error fetching bookings:', error);
          return of([]);
        })
      ),
    ]);
  }

  removeBlock(
    propertyId: string,
    blockId: string
  ): Observable<{ status: number; message: string; id: string }> {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<{ status: number; message: string; id: string }>(
      `${this.API}property/${propertyId}/block/${blockId}`,
      {
        headers,
      }
    );
  }

  updateShow(id : any , status : any): Observable<any> {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(`${this.API}properties/${id}/update-status`, {show : status}, { headers });

  }
}
