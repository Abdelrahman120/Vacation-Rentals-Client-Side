import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {

  constructor(private Http: HttpClient) { }

  getProperties() {
    return this.Http.get('http://127.0.0.1:8000/api/property');
  }
}
