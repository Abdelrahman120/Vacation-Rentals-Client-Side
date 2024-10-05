import { CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [CdkStepperNext, CdkStepperPrevious, FormsModule],
  templateUrl: './amenities.component.html',
  styleUrl: './amenities.component.css'
})
export class AmenitiesComponent {
  firstName = '';
  lastName = '';
  email = '';
  phone = '';

  submitAmenity() {
    if (!this.firstName || !this.lastName || !this.email || !this.phone) {
      alert('Please fill in all fields');
      return;
    }

    console.log({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone
    });
  }
}
