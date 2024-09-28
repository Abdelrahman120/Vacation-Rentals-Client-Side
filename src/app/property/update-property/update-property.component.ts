import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-property',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './update-property.component.html',
  styleUrl: './update-property.component.css'
})
export class UpdatePropertyComponent {
  AddForm: FormGroup;
  categories: any[] = [];
  constructor(private fb: FormBuilder, private router: Router) {
    this.AddForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', [Validators.required,]],
      description: ['', [Validators.required,]],
      price: ['', [Validators.required,]],
      category_id: ['', [Validators.required,]],
      amenities: ['', [Validators.required,]],
      number_of_room: ['', [Validators.required,]],
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

  submitted = false

  handleSubmit() {
    this.submitted = true;
    if (this.AddForm.valid) {
      const formData = new FormData();
      Object.keys(this.AddForm.value).forEach(key => {
        formData.append(key, this.AddForm.get(key)?.value);
      });
    }
  }
}
