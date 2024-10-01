import { Component } from '@angular/core';
import { RegisterUserService } from '../services/register-user.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule , FormsModule],
  templateUrl: './edit-user-profile.component.html',
  styleUrl: './edit-user-profile.component.css'
})
export class EditUserProfileComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = '';
  address: string = '';
  gender: string = '';
  selectedFile: File | null = null;
  validationErrors: any = {};
  constructor(private authService: RegisterUserService , private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onRegister() {
    this.validationErrors = {};

    // Client-side validation
    if (!this.name) {
      this.validationErrors.name = ['Name is required'];
    } else if (this.name.length < 3) {
      this.validationErrors.name = ['Name must be at least 3 characters long'];
    }

    if (!this.email) {
      this.validationErrors.email = ['Email is required'];
    } else if (!this.validateEmail(this.email)) {
      this.validationErrors.email = ['Invalid email format'];
    }

    if (!this.password) {
      this.validationErrors.password = ['Password is required'];
    } else if (this.password.length < 6) {
      this.validationErrors.password = ['Password must be at least 6 characters long'];
    }

    if (!this.confirmPassword) {
      this.validationErrors.confirmPassword = ['Password confirmation is required'];
    } else if (this.password !== this.confirmPassword) {
      this.validationErrors.confirmPassword = ['Passwords do not match'];
    }

    if (!this.phone) {
      this.validationErrors.phone = ['Phone is required'];
    } else if (!/^\d+$/.test(this.phone)) {
      this.validationErrors.phone = ['Phone must contain only digits'];
    }else if (this.phone.length !== 11) {
      this.validationErrors.phone = ['Phone must be 11 digits'];
    }

    if (!this.address) {
      this.validationErrors.address = ['Address is required'];
    } else if (this.address.length < 5) {
      this.validationErrors.address = ['Address must be at least 5 characters long'];
    }

    if (!this.gender) {
      this.validationErrors.gender = ['Gender is required'];
    }

    if (!this.selectedFile) {
      this.validationErrors.image = ['Profile image is required'];
    }

    if (Object.keys(this.validationErrors).length > 0) {
      return;
    }

    // Prepare form data to send in the request
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('password_confirmation', this.confirmPassword);
    formData.append('phone', this.phone);
    formData.append('address', this.address);
    formData.append('gender', this.gender);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.authService.register(formData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        localStorage.setItem('auth_token', response.access_token); // Store token
        this.router.navigate(['/login']);
      },
      (error) => {
        this.validationErrors = error.error.errors;
        console.log('Registration failed', error);
      }
    );
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

}

