import { CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { Component, EventEmitter, Output } from '@angular/core';
import { PropertyService } from '../../../services/propertyService/property.service';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [CdkStepperNext, CdkStepperPrevious],
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent {
  images: File[] = [];
  propertyId: string = '';
  @Output() imageFormSubmitted = new EventEmitter<void>();

  constructor(private PropertyService: PropertyService) {}

  onFileChange(event: any) {
    this.images = Array.from(event.target.files);
  }

  submitImages(event: Event) {
    event.preventDefault();

    if (this.images.length === 0) {
      console.error('No images selected.');
      return;
    }

    const formData = new FormData();
    for (const image of this.images) {
      formData.append('images[]', image);
    }

    this.propertyId = this.PropertyService.getPropertyId();

    this.PropertyService.setImages(this.propertyId, formData).subscribe(
      (response) => {
        console.log('Images uploaded successfully', response);
        this.imageFormSubmitted.emit();
      },
      (error) => {
        console.error('Error uploading images', error);
        if (error.error && error.error.errors) {
          console.error('Validation Errors:', error.error.errors);
        }
      }
    );
  }
}
