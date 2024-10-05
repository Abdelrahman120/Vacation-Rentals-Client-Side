import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../Services/user-profile.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css'],
})
export class EditUserProfileComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = '';
  address: string = '';
  gender: string = '';
  selectedFile: File | null = null;
  validationErrors: any = {};
  userId!: number;

  constructor(
    private userProfileService: UserProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId =
      +this.router.routerState.snapshot.root.firstChild?.params['id']!;
    if (!this.userId) {
      console.error('User ID is not found in the route parameters.');
      return;
    }
    this.getUserData(this.userId);
  }

  getUserData(id: number): void {
    this.userProfileService.getUser(id).subscribe(
      (response) => {
        this.name = response.name || '';
        this.email = response.email || '';
        this.phone = response.phone || '';
        this.address = response.address || '';
        this.gender = response.gender || '';
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpdate() {
    this.validationErrors = {};

    if (
      !this.name ||
      !this.email ||
      !this.phone ||
      !this.address ||
      !this.gender
    ) {
      this.validationErrors = {
        name: ['Name is required.'],
        email: ['Email is required.'],
        phone: ['Phone number is required.'],
        address: ['Address is required.'],
        gender: ['Gender is required.'],
      };
      return;
    }

    const userData: { [key: string]: any } = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address,
      gender: this.gender,
    };

    if (this.password) {
      userData['password'] = this.password;
      userData['password_confirmation'] = this.confirmPassword;
    }

    this.userProfileService.updateUser(this.userId, userData).subscribe(
      (response) => {
        console.log('Update successful', response);
        this.router.navigate(['/profile']);
      },
      (error) => {
        this.validationErrors = error.error.errors || {};
        console.error('Update failed', error);
      }
    );
  }
}
