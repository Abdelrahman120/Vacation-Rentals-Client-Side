import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService/user.service';
import { UserInfo, Payment, Booking } from '../user-info';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from './item-card/item-card.component';

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css'],
})
export class UserBookingsComponent implements OnInit {
  userInfo: UserInfo | undefined;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getBookings().subscribe(
      (res: UserInfo) => {
        this.userInfo = res;
      },
      (error) => {
        console.log('Error retrieving data:', error);
      }
    );
  }

  trackByBookingId(index: number, booking: Booking): number {
    return booking.id;
  }

  getPaymentForBooking(booking: Booking): Payment | undefined {
    return this.userInfo?.data.payments.find(
      (payment) => payment.user_id === booking.user_id
    );
  }
}
