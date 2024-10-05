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

  getPropertyByDate(input?: any) {
    let checkDest = Object.keys(input.destination);
    let checkSleeps = Object.keys(input.sleeps);
    let sleepsLength = checkSleeps.length;
    let destLength = checkDest.length;

    if (input.startDate && input.endDate && destLength > 0) {
      return this.http.get(`http://127.0.0.1:8000/api/properties/search?city=${input.destination}&start_date=${input.startDate}&end_date=${input.endDate}`)
    } else if (input.startDate && input.endDate && destLength > 0 && sleepsLength > 0) {
      return this.http.get(`http://127.0.0.1:8000/api/properties/search?city=${input.city}&start_date=${input.startDate}&end_date=${input.endDate}&sleeps=${input.sleeps}`)
    }
    return this.http.get(`http://127.0.0.1:8000/api/property`);
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
