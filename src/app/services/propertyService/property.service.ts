import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, Observable, throwError } from 'rxjs';
import { Property } from '../../owner-info';

export interface PropertyResponse {
  data: Property;
}

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private http: HttpClient) {}
  BACKEND_API = environment.BACKEND_URL;
  private propertyId: string = '';

  getCategories() {
    return this.http.get(`${this.BACKEND_API}/api/categories`);
  }

  getProperties() {
    return this.http.get(`${this.BACKEND_API}/api/property`);
  }

  getPropertyByDate(input?: any) {
    let checkDest = Object.keys(input.location);
    let checkSleeps = Object.keys(input.sleeps);
    let sleepsLength = checkSleeps.length;
    let destLength = checkDest.length;

    if (input.startDate && input.endDate && destLength > 0) {
      console.log(input.startDate);

      return this.http.get(
        `${this.BACKEND_API}/api/properties/search?location=${input.location}&start_date=${input.startDate}&end_date=${input.endDate}`
      );
    } else if (
      input.startDate &&
      input.endDate &&
      destLength > 0 &&
      sleepsLength > 0
    ) {
      return this.http.get(
        `${this.BACKEND_API}/api/properties/search?location=${input.location}&start_date=${input.startDate}&end_date=${input.endDate}&sleeps=${input.sleeps}`
      );
    }
    return this.http.get(`${this.BACKEND_API}/api/property`);
  }

  addProperty(property: any) {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.BACKEND_API}/api/property`, property, {
      headers,
    });
  }
  updateProperty(id: string, property: any) {
    return this.http.put(`${this.BACKEND_API}/api/property/${id}`, property);
  }
  deleteProperty(id: number) {
    return this.http.delete(`${this.BACKEND_API}/api/property/${id}`);
  }
  viewProperty(id: string): Observable<PropertyResponse> {
    return this.http.get<PropertyResponse>(
      `${this.BACKEND_API}/api/property/${id}`
    );
  }
  getAmenities() {
    return this.http.get(`${this.BACKEND_API}/api/amenities`);
  }

  setAmenities(id: string, value: any) {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      `${this.BACKEND_API}/api/property/${id}/amenities`,
      value,
      { headers }
    );
  }
  updateAmenities(id: string, value: any) {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(
      `${this.BACKEND_API}/api/property/${id}/update-amenities`,
      value,
      { headers }
    );
  }
  setPropertyId(id: string) {
    this.propertyId = id;
  }
  getPropertyId(): string {
    return this.propertyId;
  }
  setImages(id: string, formData: FormData) {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      `${this.BACKEND_API}/api/property/${id}/images`,
      formData,
      { headers }
    );
  }
  updateImages(id: string, formData: FormData) {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(
      `${this.BACKEND_API}/api/property/${id}/update-images`,
      // { formData },
      { formData, _method: 'PUT' },
      { headers }
    );
  }
  getPropertiesByAmenity(amenityIds: number[]) {
    return this.http.post(`${this.BACKEND_API}/api/properties/filter`, {
      amenity: amenityIds,
    });
  }

  getPropertiesByCategory(categoryId: number) {
    return this.http.post(`${this.BACKEND_API}/api/properties/category`, {
      category: categoryId,
    });
  }

  getSuggestions(query: string) {
    return this.http
      .get(`${this.BACKEND_API}/api/location-suggestions?query=${query}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    return throwError('An error occurred; please try again later.');
  }
}
