import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private url = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }

  createCheckoutSession(product_name : string , price: number , quantity: number = 1) {
    const headers = new HttpHeaders({'content-type': 'application/json'});
    return this.http.post<any>(`${this.url}/stripe`, {product_name, price, quantity}, {headers}); 
  }

  handlePaymentSuccess(session_id: string): Observable<any> 
  {
    return this.http.get(`${this.url}/success?session_id=${session_id}`);
  }

  handlePaymentCancle(): Observable<any>{
    return this.http.get(`${this.url}/cancle`);
  }
}
