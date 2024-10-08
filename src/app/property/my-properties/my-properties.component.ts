import { Component } from '@angular/core';
import { OwnerProfileService } from '../../Services/owner-profile.service';
import { OwnerInfoService } from '../../services/owner-info.service';
import { Booking, OwnerInfo } from '../../owner-info';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-my-properties',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, TruncatePipe],
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.css'],
})
export class MyPropertiesComponent {
  ownerInfo: OwnerInfo | null = null;

  constructor(
    private ownerInfoService: OwnerInfoService,
    private ownerProfile: OwnerProfileService
  ) { }

  ngOnInit(): void {
    this.loadOwnerInfo();
  }

  loadOwnerInfo(): void {
    const token = localStorage.getItem('owner_auth_token');
    if (token) {
      this.ownerInfoService.getOwnerInfo(token).subscribe(
        (response: OwnerInfo) => {
          this.ownerInfo = response;
        },
        (error) => {
          console.error('Error fetching owner details', error);
        }
      );
    }
  }

  deleteProperty(propertyId: number): void {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this property?'
    );

    if (isConfirmed) {
      this.ownerProfile.deleteProperty(propertyId).subscribe(
        (response) => {
          this.loadOwnerInfo();
          this.showSuccessMessage();
        },
        (error) => {
          console.error('Error deleting property:', error);
        }
      );
    } else {
      console.log('Deletion canceled by the user');
    }
  }

  showNotification = false;

  showSuccessMessage(): void {
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  getCompletedBookings(bookings: Booking[]): number {
    const today = new Date();
    return bookings.filter(booking => new Date(booking.end_date) < today).length;
  }

  getUpcomingBookings(bookings: Booking[]): number {
    const today = new Date();
    return bookings.filter(booking => new Date(booking.start_date) > today).length;
  }
}
