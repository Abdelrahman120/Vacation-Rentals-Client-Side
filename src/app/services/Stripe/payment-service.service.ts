import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  stripePromise = loadStripe(environment.stripePublicKey);
  backEnd_API = environment.BACKEND_URL;

  constructor(private http: HttpClient) { }

  createCheckoutSession(amount: number, hostStripeAccountId: string) {
    return this.http.post(`${this.backEnd_API}/api/create-checkout-session`, {
      amount,
      host_stripe_account_id: hostStripeAccountId
    });
  }

  async redirectToCheckout(sessionId: string) {
    const stripe = await this.stripePromise;
    stripe?.redirectToCheckout({ sessionId });
  }
}
