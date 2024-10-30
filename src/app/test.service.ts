import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = environment.BACKEND_URL;

  constructor(private http: HttpClient) { }

  getProperty(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/property/${id}`);
  }
}
