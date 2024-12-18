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
    const {
      location,
      sleeps,
      startDate,
      endDate,
      bedrooms,
      bathrooms,
      price_min,
      price_max,
    } = input;
    const hasLocation = location && Object.keys(location).length > 0;
    const hasSleeps = sleeps && Object.keys(sleeps).length > 0;
    const hasPriceMax = price_max && Object.keys(price_max).length > 0;
    const hasPriceMin = price_min && Object.keys(price_min).length > 0;
    const hasBedrooms = bedrooms && Object.keys(bedrooms).length > 0;
    const hasBathrooms = bathrooms && Object.keys(bathrooms).length > 0;

    if (startDate && endDate && hasLocation) {
      let url = `${this.BACKEND_API}/api/properties/search?location=${location}&start_date=${startDate}&end_date=${endDate}`;

      if (hasSleeps) {
        url += `&sleeps=${sleeps}`;
      }
      if (hasPriceMax && hasPriceMin) {
        url += `&price_min=${price_min}&price_max=${price_max}`;
      }
      if (hasBedrooms) {
        url += `&bedrooms=${bedrooms}`;
      }
      if (hasBathrooms) {
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

  getFirstThree() {
    return this.http.get(`${this.BACKEND_API}/api/first/three`);
  }

  viewPropertyForOffer(id: string): Observable<any> {
    return this.http.get(`${this.BACKEND_API}/api/property/${id}`);
  }

  updateOffer(
    propertyId: any,
    offer: any,
    start_date: any,
    end_date: any
  ): Observable<any> {
    const token = localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      `http://localhost:8000/api/properties/${propertyId}/offer`,
      { offer, offer_start_date: start_date, offer_end_date: end_date },
      { headers }
    );
  }
  getPropertiesByOffer(offer: string) {
    let offerParam = offer === 'yes' ? 'offer>0' : 'offer=0';
    return this.http.get(
      `${this.BACKEND_API}/api/properties/with-offer?offer=${offerParam}`
    );
  }

  checkIfPropertyAvailable(
    propertyId: string,
    dates: { start_date: Date; end_date: Date }
  ) {
    const formattedStartDate = dates.start_date.toISOString().split('T')[0];
    const formattedEndDate = dates.end_date.toISOString().split('T')[0];

    return this.http.post(
      `${this.BACKEND_API}/api/property-booking/${propertyId}`,
      {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      }
    );
  }
}
