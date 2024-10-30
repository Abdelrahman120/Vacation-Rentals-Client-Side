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
  hostInfo: { [bookingId: number]: any } = {};

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getBookings().subscribe({
      next: (res: UserInfo) => {
        this.userInfo = res;

        if (this.userInfo?.data.bookings) {
          this.userInfo.data.bookings.forEach((booking: Booking) => {
            const ownerId = booking.property.owner_id;
            this.getOwnerInfo(ownerId, booking.id);
          });
        }
      },
      error: (error) => {
        console.log('Error retrieving data:', error);
      },
    });
  }

  getOwnerInfo(ownerId: number, bookingId: number) {
    this.userService.getOwnerById(ownerId).subscribe({
      next: (ownerData: any) => {
        this.hostInfo[bookingId] = ownerData;
      },
      error: (error) => {
        console.log('Error retrieving owner info:', error);
      },
    });
  }

  trackByBookingId(index: number, booking: Booking): number {
    return booking.id;
  }

  getPaymentForBooking(index: number): Payment | undefined {
    return this.userInfo?.data.payments[index];
  }
}
