import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  getProperty() {
    return this.http.get('http://127.0.0.1:8000/api/property')
  }

  addProperty(property: any) {
    return this.http.post("http://127.0.0.1:8000/api/property", property)
  }

  updateProperty(property: any, id: number) {
    return this.http.post(`http://127.0.0.1:8000/api/property/${id}`, property)
  }

  deleteProperty(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/property/${id}`)
  }

  viewProperty(id: number) {
    return this.http.get(`http://127.0.0.1:8000/api/property/${id}`)
  }
}
