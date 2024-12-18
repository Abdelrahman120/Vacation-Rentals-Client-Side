import { CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../../services/propertyService/property.service';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [CdkStepperNext, CdkStepperPrevious, FormsModule, NgClass],
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css'],
})
export class AmenitiesComponent {
  constructor(private PropertyService: PropertyService) {}

  @Output() AmenityFormSubmitted = new EventEmitter<void>();
  amenities: any = [];
  amenityError = false;
  propertyId: string = '';

  ngOnInit(): void {
    this.getAmenities();
  }

  getAmenities() {
    this.PropertyService.getAmenities().subscribe((amenities: any) => {
      this.amenities = amenities.data;
      console.log('amenities:', amenities.data);
    });
  }

  submitAmenity() {
    if (this.amenities.length === 0) {
      this.amenityError = true;
      return;
    }

    const selectedAmenities = this.amenities.filter(
      (amenity: any) => amenity.isChecked
    );

    if (selectedAmenities.length === 0) {
      this.amenityError = true;
      return;
    }

    this.amenityError = false;
    this.propertyId = this.PropertyService.getPropertyId();
    this.PropertyService.setAmenities(this.propertyId, {
      amenities: selectedAmenities.map((amenity: any) => amenity.id),
    }).subscribe(
      (response) => {
        console.log('Amenities submitted successfully', response);
        this.AmenityFormSubmitted.emit();
      },
      (error) => {
        console.error('Error submitting amenities', error);
      }
    );
  }
}
