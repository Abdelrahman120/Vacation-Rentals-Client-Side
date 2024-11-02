import { CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { Component, EventEmitter, Output } from '@angular/core';
import { PropertyService } from '../../../services/propertyService/property.service';

@Component({
  selector: 'app-pictures',
  standalone: true,
  imports: [CdkStepperNext, CdkStepperPrevious],
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css'],
})
export class PicturesComponent {
  images: File[] = [];
  propertyId: string = '';
  @Output() imageFormSubmitted = new EventEmitter<void>();
  imageError: string | null = null;

  constructor(private PropertyService: PropertyService) {}

  onFileChange(event: any) {
    this.images = Array.from(event.target.files);
    this.imageError = null;
  }

  submitImages(event: Event) {
    event.preventDefault();

    if (this.images.length === 0) {
      this.imageError = 'Please upload at least one image.';
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    for (const image of this.images) {
      if (!allowedTypes.includes(image.type)) {
        this.imageError = 'Only JPEG and PNG files are allowed.';
        return;
      }
    }

    this.imageError = null;

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
