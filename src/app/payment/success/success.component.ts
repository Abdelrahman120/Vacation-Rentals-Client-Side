import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StripeService } from '../../services/stripe.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [NgIf],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
  paymentDetails: any;

  constructor(private route: ActivatedRoute, private stripeService: StripeService) {}

  ngOnInit(): void {
    const session_id = this.route.snapshot.queryParamMap.get('session_id');
    if (session_id) {
      this.stripeService.handlePaymentSuccess(session_id).subscribe(response => {
        this.paymentDetails = response.payment;
      }, error => {
        console.error('Error in payment success handling:', error);
      });
    }
  }

}
