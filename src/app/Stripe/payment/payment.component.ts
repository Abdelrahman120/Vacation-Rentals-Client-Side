import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/Stripe/payment-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true
})
export class PaymentComponent implements OnInit {
  hostStripeAccountId = 'acct_1Q4msm2USqD39xc8';

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void { }

  createCheckoutSession() {
    this.paymentService.createCheckoutSession(5000, this.hostStripeAccountId).subscribe((response: any) => {
      this.paymentService.redirectToCheckout(response.id);
    });
  }
}
