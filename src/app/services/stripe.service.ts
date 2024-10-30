import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private url = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }
  
  // logout(): Observable<any> {
  //   const token = localStorage.getItem('owner_auth_token');
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`
  //   });
  //   return this.http.post(`${this.url}/logout`, {} , { headers });
  // }


  
  createCheckoutSession(product_name: string, price: number, quantity: number, start_date: string, end_date: string , user_id : string , propertyId:string ) {
    // Ensure credentials are included in the request.
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.url}/stripe`, {
      product_name,
      price,
      quantity,
      start_date,
      end_date,
      user_id,
      propertyId,
           
    }, {
      headers,
      withCredentials: true 
    });
  }

  handlePaymentSuccess(session_id: string): Observable<any> 
  {
    return this.http.get(`${this.url}/success?session_id=${session_id}`);
  }

  handlePaymentCancle(): Observable<any>{
    return this.http.get(`${this.url}/cancle`);
  }
}
