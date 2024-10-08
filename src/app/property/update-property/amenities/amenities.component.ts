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
  @Output() AmenityFormSubmitted = new EventEmitter<void>();

  amenities: any[] = [];
  amenityError = false;
  propertyId: string = '';

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.getAmenities();
  }

  getAmenities() {
    this.propertyService.getAmenities().subscribe((response: any) => {
      this.amenities = response.data.map((amenity: any) => ({
        ...amenity,
        isChecked: false // Ensure all amenities are unchecked by default
      }));
      console.log('Amenities fetched:', this.amenities);
    });
  }

  submitAmenity() {
    const selectedAmenities = this.amenities.filter(amenity => amenity.isChecked);
    const selectedAmenityIds = selectedAmenities.map(amenity => amenity.id);

    console.log('Selected Amenities:', selectedAmenityIds);

    if (selectedAmenities.length === 0) {
      this.amenityError = true;
      return;
    }

    this.amenityError = false;
    this.propertyId = this.propertyService.getPropertyId();

    const data = {
      amenities: selectedAmenityIds,
    };

    this.propertyService.updateAmenities(this.propertyId, data).subscribe(
      (response) => {
        console.log('Amenities submitted successfully:', response);
        this.AmenityFormSubmitted.emit();
      },
      (error) => {
        console.error('Error submitting amenities:', error);
      }
    );
  }
}
