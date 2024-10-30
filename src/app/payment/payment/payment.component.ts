import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { StripeService } from '../../services/stripe.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {
  NgxDaterangepickerBootstrapDirective,
  NgxDaterangepickerBootstrapComponent,
} from 'ngx-daterangepicker-bootstrap';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgxDaterangepickerBootstrapDirective,
    NgxDaterangepickerBootstrapComponent,
  ],
})
export class PaymentComponent {
  product_name: string = '';
  price: number = 0;
  quantity: number = 1;
  dates: any = { startDate: null, endDate: null };
  constructor(
    private stripeService: StripeService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}
  totalPrice: number = 0;
  sleeps: number = 0;
  name: string = '';
  user_id: string = '';
  propertyId: string = '';

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.product_name = params['product_name'];
      this.price = params['total_price'];
      this.sleeps = params['sleeps'];
      this.totalPrice = this.price;
      this.dates.startDate = this.formatDate(params['start_date']);
      this.dates.endDate = this.formatDate(params['end_date']);
      this.propertyId = params['propertyId'];
    });
    console.log(this.propertyId);
    console.log('Start Date:', this.dates.startDate);
    console.log('End Date:', this.dates.endDate);
  }

  get formattedDates(): string {
    return `${this.dates.startDate} - ${this.dates.endDate}`;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  async makePayment(
    product_name: string,
    price: number,
    quantity: number,
    start_date: string,
    end_date: string,
    user_id: string,
    propertyId: string
  ) {
    this.stripeService
      .createCheckoutSession(
        product_name,
        price,
        quantity,
        start_date,
        end_date,
        user_id,
        propertyId
      )
      .subscribe(async (response: any) => {
        if (response.status === 'success') {
          const stripe = await loadStripe(
            'pk_test_51OVzXxEJU94mdRatoMSYRwVFpGOp9kSY2kkFizH2X0EYgZkcvVQu9If5m1R2Teb2hNQG0tZac0iOoMGaopRbGLTo00fKadYhK8'
          );
          stripe?.redirectToCheckout({
            sessionId: response.sessionId,
          });
        } else {
          console.error('Failed to create Stripe session:', response.message);
        }
      });
  }
}
