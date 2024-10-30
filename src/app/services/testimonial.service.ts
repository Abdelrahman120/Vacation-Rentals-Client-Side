import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private http: HttpClient) { }
  private api = "http://localhost:8000/api/testimonial";
  private apiUrl = "http://localhost:8000/api/user/testimonials";

  sendTestimonial(formData : any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    });
    return this.http.post(`${this.api}/` , formData, {headers});
  }

  getAllTestimonials(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
