import { CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../../services/propertyService/property.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [CdkStepperNext, CdkStepperPrevious, FormsModule, CommonModule],
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css'],
})
export class AmenitiesComponent {
  @Output() AmenityFormSubmitted = new EventEmitter<void>();

  amenities: any[] = [];
  amenityError = false;
  propertyId: string = '';

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyId = params['id'];
      this.getAmenities();
      this.getPropertyAmenities();
    });
  }

  getAmenities() {
    this.propertyService.getAmenities().subscribe((response: any) => {
      this.amenities = response.data.map((amenity: any) => ({
        ...amenity,
        isChecked: false,
      }));
    });
  }

  getPropertyAmenities() {
    this.propertyService
      .getPropertyAmenities(this.propertyId)
      .subscribe((response: any) => {
        const existingAmenityIds = response.data.map(
          (amenity: any) => amenity.amenity_id
        );
        this.amenities.forEach((amenity) => {
          if (existingAmenityIds.includes(amenity.id)) {
            amenity.isChecked = true;
          }
        });
      });
  }

  submitAmenity() {
    const selectedAmenities = this.amenities.filter(
      (amenity) => amenity.isChecked
    );
    const selectedAmenityIds = selectedAmenities.map((amenity) => amenity.id);
    if (selectedAmenities.length === 0) {
      this.amenityError = true;
      return;
    }
    this.amenityError = false;
    const data = {
      amenities: selectedAmenityIds,
    };
    this.propertyService.updateAmenities(this.propertyId, data).subscribe(
      (response) => {
        this.AmenityFormSubmitted.emit();
      },
      (error) => {
        console.error('Error submitting amenities:', error);
      }
    );
  }
}
