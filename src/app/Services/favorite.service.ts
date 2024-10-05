import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private apiUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}
  addToFavorites(propertyId: number) {
    const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
    return this.http.post(`${this.apiUrl}/favorites`, { property_id: propertyId } ,{ headers });
  }
  removeFromFavorites(propertyId: number) {
    const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
    return this.http.delete(`${this.apiUrl}/favorites/${propertyId}`,  { headers });
  }
  getUserFavorites() {
    const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
    return this.http.get(`${this.apiUrl}/favorites`,{ headers });
  }
 
}
