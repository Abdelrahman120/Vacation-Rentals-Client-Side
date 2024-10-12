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

  images: any;
  propertyId: string = '';
  @Output() imageFormSubmitted = new EventEmitter<void>();
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.propertyId = params['id'];
    });
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.images = Array.from(target.files);
    }
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
