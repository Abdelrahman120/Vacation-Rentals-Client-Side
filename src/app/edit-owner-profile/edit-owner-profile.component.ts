import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerProfileService } from '../Services/owner-profile.service';

@Component({
  selector: 'app-edit-owner-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-owner-profile.component.html',
  styleUrls: ['./edit-owner-profile.component.css'],
})
export class EditOwnerProfileComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  validationErrors: any = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ownerProfileService: OwnerProfileService
  ) {
    this.registerForm = this.fb.group({
      company_name: ['', Validators.required],
      name: ['', Validators.required],
      owner_image: [''],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      description: ['', Validators.required],
      role: ['owner'],
      gender: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      password: ['', [Validators.minLength(6)]],
      password_confirmation: [''],
    });
  }

  ngOnInit() {
    this.loadOwnerData();
  }

  loadOwnerData(): void {
    const ownerId = this.getOwnerIdFromLocalStorage();
    const namegoogle = localStorage.getItem('userName');
    const emailgoogle = localStorage.getItem('userEmail');
    this.ownerProfileService.getOwner(ownerId).subscribe(
      (data) => {
        console.log('Owner data:', data);
        this.registerForm.patchValue({
          name: data.name || namegoogle,
          email: data.email || emailgoogle,
          phone: data.phone,
          address: data.address,
          owner_image: data.owner_image,
          company_name: data.company_name,
          gender: data.gender,
          description: data.description,
        });
      },
      (error) => {
        console.log('Error fetching owner data:', error);
      }
    );
  }

  getOwnerIdFromLocalStorage(): number {
    const ownerId = +localStorage.getItem('ownerid')!;
    console.log('Owner ID from localStorage:', ownerId);
    return ownerId;
  }

  handleEditSubmit() {
    this.submitted = true;

    if (this.registerForm.valid) {
      const formData = { ...this.registerForm.value };

      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get(
        'password_confirmation'
      )?.value;
      if (password && password !== confirmPassword) {
        this.validationErrors.password_confirmation = [
          'Passwords do not match.',
        ];
        return;
      }

      console.log('Form Data before submitting:', formData);
      const ownerId = this.getOwnerIdFromLocalStorage();
      this.ownerProfileService.updateOwner(ownerId, formData).subscribe(
        (response) => {
          console.log('Update successful:', response);
          this.router.navigate(['/add-property']);
        },
        (error) => {
          console.error('Update failed:', error);
          this.handleErrors(error);
        }
      );
    }
  }

  handleErrors(error: any) {
    if (error.status === 422 && error.error && error.error.errors) {
      this.validationErrors = error.error.errors;
      console.log('Validation errors:', this.validationErrors);
      Object.keys(this.validationErrors).forEach((key) => {
        const formControl = this.registerForm.get(key);
        if (formControl) {
          formControl.setErrors({ serverError: this.validationErrors[key][0] });
        }
      });
    } else {
      console.error('Something went wrong; please try again later.');
    }
  }
}
