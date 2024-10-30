import { Component } from '@angular/core';
import { Property } from '../../owner-info';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/propertyService/property.service';
import { SidebarComponent } from '../../admin-dashboard/sidebar/sidebar.component';
import { OwnerSidebarComponent } from '../owner-sidebar/sidebar.component';

@Component({
  selector: 'app-property-booking-details',
  standalone: true,
  imports: [CommonModule, OwnerSidebarComponent],
  templateUrl: './property-booking-details.component.html',
  styleUrl: './property-booking-details.component.css',
})
export class PropertyBookingDetailsComponent {
  property: Property | null = null;
  propertyId: string = '';
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyId = params['id'];
    });
    this.loadOwnerInfo();
  }

  loadOwnerInfo(): void {
    const token = localStorage.getItem('owner_auth_token');
    if (token) {
      this.propertyService.viewProperty(this.propertyId).subscribe(
        (response: { data: Property }) => {
          this.property = response.data;
          console.log('response:', this.property);
          console.log('Booking length:', this.property.bookings.length);
        },
        (error) => {
          console.error('Error fetching owner details', error);
        }
      );
    }
  }

  checkBookStatus(strDate: string, endDate: string): string {
    const now = new Date();
    const bookingStrDate = new Date(strDate);
    const bookingEndDate = new Date(endDate);

    const strTimeDiff = bookingStrDate.getTime() - now.getTime();
    const endTimeDiff = bookingEndDate.getTime() - now.getTime();

    if (strTimeDiff <= 0 && endTimeDiff > 0) {
      return 'Booking started';
    }

    if (endTimeDiff < 0) {
      return 'Booking is complete';
    }

    return 'reserved';
  }

  getTimeLeft(endDate: string): string {
    const now = new Date();
    const bookingEndDate = new Date(endDate);

    const endTimeDiff = bookingEndDate.getTime() - now.getTime();

    if (endTimeDiff < 0) {
      return 'Booking is complete';
    }

    const daysLeft = Math.floor(endTimeDiff / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor(
      (endTimeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesLeft = Math.floor(
      (endTimeDiff % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${daysLeft} days, ${hoursLeft} hours, and ${minutesLeft} minutes left`;
  }
}
