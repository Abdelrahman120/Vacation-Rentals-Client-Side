import { Component } from '@angular/core';
import { OwnerSidebarComponent } from "../property/owner-sidebar/sidebar.component";
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../services/propertyService/property.service';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [OwnerSidebarComponent , CommonModule, FormsModule],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})
export class OfferComponent {
  newOffer:any;
  propertyId: any;
  propertyData: any;
  originalPrice: any;
  finalPrice: any;
  alertMessage: string | null = null; 
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    // Get the property ID from the URL
    this.route.paramMap.subscribe(params => {
      this.propertyId = Number(params.get('id'));
      this.fetchPropertyDetails();
    console.log("this.propertyId"+this.propertyId);
    });
    // this.fetchPropertyDetails();
    
  }

  fetchPropertyDetails(): void {
    this.propertyService.viewPropertyForOffer(this.propertyId).subscribe({
      next: (response) => {
        this.propertyData = response.data;
        this.originalPrice = this.propertyData.night_rate;
        this.finalPrice = this.propertyData.offer 
          ? this.originalPrice * (1 - this.propertyData.offer / 100) 
          : this.originalPrice;
      },
      error: (error) => {
        console.error("Error fetching property data:", error);
      }
    });
}

updateOffer(propertyId: any, newOffer: any) {
  this.propertyService.updateOffer(propertyId, newOffer).subscribe({
    next: (response) => {
      this.showAlert('Offer updated successfully!');
      setTimeout(() => {
      // window.location.reload();

      } , 2)
    },
    error: (error) => {
      this.showAlert('Error updating the offer.');
    }
  });
}

resetOffer(): void {
  const propertyId = this.propertyId; 
  const newOffer = 0; 

  this.propertyService.updateOffer(propertyId, newOffer).subscribe({
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
