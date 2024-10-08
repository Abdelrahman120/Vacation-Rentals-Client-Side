import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../Services/user-profile.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css'],
})
export class EditUserProfileComponent implements OnInit {
  editProfile: FormGroup;
  selectedFile: File | null = null;
  validationErrors: any = {};
  userId!: number;

  constructor(
    private userProfileService: UserProfileService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.editProfile = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

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
        console.log(response);
        this.editProfile.patchValue({
          name: response.data.name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          address: response.data.address || '',
          gender: response.data.gender || '',
        });
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

    if (this.editProfile.invalid) {
      Object.keys(this.editProfile.controls).forEach((key) => {
        if (this.editProfile.controls[key].invalid) {
          this.validationErrors[key] = [
            `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`,
          ];
        }
      });
      return;
    }

    const userData = this.editProfile.value;

    if (this.selectedFile) {
      userData.image = this.selectedFile;
    }

    this.userProfileService.updateUser(this.userId, userData).subscribe(
      (response) => {
        console.log('Update successful', response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.validationErrors = error.error.errors || {};
        console.error('Update failed', error);
      }
    );
  }
}
