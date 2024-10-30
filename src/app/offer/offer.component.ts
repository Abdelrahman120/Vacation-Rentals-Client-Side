import { Component } from '@angular/core';
import { OwnerSidebarComponent } from "../property/owner-sidebar/sidebar.component";
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../services/propertyService/property.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [OwnerSidebarComponent, CommonModule, FormsModule],
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent {
  newOffer: any;
  propertyId: any;
  propertyData: any;
  originalPrice: any;
  finalPrice: any;
  alertMessage: string | null = null; 
  offerStartDate: string | null = null; 
  offerEndDate: string | null = null; 

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.propertyId = Number(params.get('id'));
      this.fetchPropertyDetails();
    });
  }

  fetchPropertyDetails(): void {
    this.propertyService.viewPropertyForOffer(this.propertyId).subscribe({
      next: (response) => {
        this.propertyData = response.data;
        this.originalPrice = this.propertyData.night_rate;

        // const today = new Date();
        const startDate = new Date(this.propertyData.offer_start_date);
        const endDate = new Date(this.propertyData.offer_end_date);

        // Check if the current date is within the offer period
        // if (today >= startDate && today <= endDate && this.propertyData.offer) {
          this.finalPrice = this.originalPrice * (1 - this.propertyData.offer / 100);
        // } else {
        //   this.finalPrice = this.originalPrice; // No offer available
        // }

        // Set the dates if they exist in the response
        this.offerStartDate = this.propertyData.offer_start_date || null;
        this.offerEndDate = this.propertyData.offer_end_date || null;
      },
      error: (error) => {
        console.error("Error fetching property data:", error);
      }
    });
  }

  updateOffer(propertyId: any, newOffer: any) {
    // Validate dates
    if (this.offerStartDate && this.offerEndDate && new Date(this.offerStartDate) > new Date(this.offerEndDate)) {
      this.showAlert('End date must be after start date.');
      return;
    }

    this.propertyService.updateOffer(propertyId, newOffer, this.offerStartDate, this.offerEndDate).subscribe({
      next: (response) => {
        this.showAlert('Offer updated successfully!');
        setTimeout(() => {
          this.fetchPropertyDetails();
        }, 2000);
      },
      error: (error) => {
        this.showAlert('Error updating the offer.');
      }
    });
  }

  resetOffer(): void {
    const propertyId = this.propertyId; 
    const newOffer = 0; 
    const startDate = null; // Resetting to null
    const endDate = null; // Resetting to null
  
    this.propertyService.updateOffer(propertyId, newOffer, startDate, endDate).subscribe({
      next: (response) => {
        this.fetchPropertyDetails();
        this.showAlert('Offer reset to 0 successfully!');
      },
      error: (error) => {
        this.showAlert('Error resetting the offer.');
      }
    });
  }

  // Method to show alert message
  private showAlert(message: string) {
    this.alertMessage = message;
    setTimeout(() => {
      this.alertMessage = null; 
    }, 5000);
  }
}
