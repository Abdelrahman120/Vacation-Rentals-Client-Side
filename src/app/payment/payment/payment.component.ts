import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { StripeService } from '../../services/stripe.service';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  standalone: true,
  imports: [FormsModule],   
})
export class PaymentComponent {

  product_name: string = '';
  price: number = 0;
  quantity: number = 1;

  constructor(private stripeService: StripeService , private http: HttpClient, private route: ActivatedRoute) {}
  totalPrice: number = 0
  sleeps: number = 0
  name: string = ''

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.product_name = params['product_name'];
      this.price = params['total_price'];
      this.sleeps = params['sleeps'];
      this.totalPrice = this.price
    });
  }
  
  async makePayment(product_name: string, price: number, quantity: number = 1) {
    this.stripeService.createCheckoutSession(product_name, price, quantity).subscribe(async (response: any) => {
      if (response.status === 'success') {
        const stripe = await loadStripe('pk_test_51OVzXxEJU94mdRatoMSYRwVFpGOp9kSY2kkFizH2X0EYgZkcvVQu9If5m1R2Teb2hNQG0tZac0iOoMGaopRbGLTo00fKadYhK8');  // Set your Stripe public key
        stripe?.redirectToCheckout({
          sessionId: response.sessionId
        });
      } else {
        console.error('Failed to create Stripe session:', response.message);
      }
    });
  }


}
