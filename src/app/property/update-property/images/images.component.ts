import { CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PropertyService } from '../../../services/propertyService/property.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [CdkStepperNext, CdkStepperPrevious],
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {
  constructor(
    private PropertyService: PropertyService,
    private route: ActivatedRoute
  ) {}

  images: File[] = [];
  propertyId: string = '';
  @Output() imageFormSubmitted = new EventEmitter<void>();
  imageError: string | null = null;

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.propertyId = params['id'];
    });
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.images = Array.from(target.files);
      this.imageError = null;
    }
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
      if (image.size > 10 * 1024 * 1024) {
        this.imageError = 'Each image must be less than 10MB.';
        return;
      }
    }

    this.imageError = null;

    const formData = new FormData();
    for (const image of this.images) {
      formData.append('images[]', image);
    }

    this.PropertyService.updateImages(this.propertyId, formData).subscribe(
      (response) => {
        console.log('Images updated successfully', response);
        this.imageFormSubmitted.emit();
      },
      (error) => {
        console.error('Error updating images', error);
        if (error.error && error.error.errors) {
          console.error('Validation Errors:', error.error.errors);
        }
      }
    );
  }
}
