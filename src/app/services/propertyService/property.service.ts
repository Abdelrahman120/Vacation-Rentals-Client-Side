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

  getPropertiesUsingPagination(pageNumber: number) {
    return this.http.get(
      `${this.BACKEND_API}/api/property?page=${pageNumber}&limit=12`
    );
  }

  getPropertyByDate(input?: any) {
    const { location, sleeps, startDate, endDate, bedrooms, bathrooms, price_min,price_max } = input;
    const hasLocation = location && Object.keys(location).length > 0;
    const hasSleeps = sleeps && Object.keys(sleeps).length > 0;
    const haspricemax= price_max&&Object.keys(price_max).length>0;
    const haspricemin= price_min&&Object.keys(price_min).length>0;
    const hasbedrooms= bedrooms&&Object.keys(bedrooms).length>0;
    const hasbathrooms= bathrooms&&Object.keys(bathrooms).length>0;    

    if (startDate && endDate && hasLocation) {
      let url = `${this.BACKEND_API}/api/properties/search?location=${location}&start_date=${startDate}&end_date=${endDate}`;

      if (hasSleeps) {
        url += `&sleeps=${sleeps}`;
      }
      if(haspricemax && haspricemin){
        url += `&price_min=${price_min}&price_max=${price_max}`;
      }
      if (hasbedrooms){
        url += `&bedrooms=${bedrooms}`;
      }
      if (hasbathrooms){
        url += `&bathrooms=${bathrooms}`;
      }

      return this.http.get(url);
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
    const token = localStorage.getItem('owner_auth_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(`${this.BACKEND_API}/api/property/${id}`, property, {
      headers,
    });
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
  updateImages(id: string, formData: FormData): Observable<any> {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(
      `${this.BACKEND_API}/api/property/${id}/update-images`,
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

  getPropertyAmenities(id: string) {
    return this.http.get(`${this.BACKEND_API}/api/property-amenities/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    return throwError('An error occurred; please try again later.');
  }


  getFirstThree(){
    return this.http.get(`${this.BACKEND_API}/api/first/three`);
  }

  viewPropertyForOffer(id: string): Observable<any> {
    return this.http.get(
      `${this.BACKEND_API}/api/property/${id}`
    );
  }


  updateOffer(propertyId: any, offer: any): Observable<any> {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    return this.http.put(`http://localhost:8000/api/properties/${propertyId}/offer`, { offer } , { headers });
  }
}
