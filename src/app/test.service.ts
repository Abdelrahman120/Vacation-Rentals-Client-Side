import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://localhost:8000/api/property';

  constructor(private http: HttpClient) {}

  getProperty(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/1`);
  }
}
