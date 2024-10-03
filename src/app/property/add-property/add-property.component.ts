import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/propertyService/property.service';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent {
  AddForm: FormGroup;
  categories: any[] = [];
  submitted = false

  constructor(private fb: FormBuilder, private router: Router, private PropertyService: PropertyService) {
    this.AddForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', [Validators.required,]],
      description: ['', [Validators.required,]],
      category_id: ['', [Validators.required,]],
      amenities: ['', [Validators.required,]],
      number_of_rooms: ['', [Validators.required,]],
      headline: ['', [Validators.required,]],
      night_rate: ['', [Validators.required,]],
      city: ['', [Validators.required,]],
      country: ['', [Validators.required,]],
      address: ['', [Validators.required,]],
      status: ['', [Validators.required,]],
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.AddForm.patchValue({
      image: file
    });
  }

  handleSubmit() {
    this.submitted = true;
    if (this.AddForm.valid) {
      const formData = new FormData();
      Object.keys(this.AddForm.value).forEach(key => {
        formData.append(key, this.AddForm.get(key)?.value);
      });
      this.PropertyService.addProperty(formData).subscribe(
        response => {
          console.log('property added successfully:', response);
        },
        error => {
          console.error("Error Property wasn't added:", error);
        }
      );
    }
  }
}
