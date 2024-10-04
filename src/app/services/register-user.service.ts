import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  private apiUrl = 'http://127.0.0.1:8000/api/register/';


  constructor(private http: HttpClient) { }


  register(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }


}
