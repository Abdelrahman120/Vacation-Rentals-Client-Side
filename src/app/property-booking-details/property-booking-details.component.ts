import { Component } from '@angular/core';
import { OwnerInfo } from '../owner-info';
import { OwnerInfoService } from '../services/owner-info.service';
import { OwnerProfileService } from '../Services/owner-profile.service';

@Component({
  selector: 'app-property-booking-details',
  standalone: true,
  imports: [],
  templateUrl: './property-booking-details.component.html',
  styleUrl: './property-booking-details.component.css',
})
export class PropertyBookingDetailsComponent {
  ownerInfo: OwnerInfo | null = null;
  constructor(private ownerInfoService: OwnerInfoService) {}
  ngOnInit(): void {
    this.loadOwnerInfo();
  }

  loadOwnerInfo(): void {
    const token = localStorage.getItem('owner_auth_token');
    if (token) {
      this.ownerInfoService.getOwnerInfo(token).subscribe(
        (response: OwnerInfo) => {
          this.ownerInfo = response;
          console.log(this.ownerInfo);
        },
        (error) => {
          console.error('Error fetching owner details', error);
        }
      );
    }
  }
}
