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
  imageError: string | null = null;

  constructor(
    private userProfileService: UserProfileService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.editProfile = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(11),
            Validators.pattern(/^\d+$/),
          ],
        ],
        address: ['', Validators.required],
        gender: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', Validators.required],
        image: [''],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        this.imageError = 'Only JPEG and PNG formats are allowed.';
        this.editProfile.get('image')?.setErrors({ invalidType: true });
      } else if (file.size > 5 * 1024 * 1024) {
        this.imageError = 'File size should not exceed 5 MB.';
        this.editProfile.get('image')?.setErrors({ maxSize: true });
      } else {
        this.imageError = null;
        this.selectedFile = file;
      }
    }
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirm_password')?.value;

    if (password !== confirmPassword) {
      form.get('confirm_password')?.setErrors({ mismatch: true });
    } else {
      form.get('confirm_password')?.setErrors(null);
    }
    return null;
  }

  ngOnInit(): void {
    this.userId =
      +this.router.routerState.snapshot.root.firstChild?.params['id']!;

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
        console.log('User data received:', response);
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

  onUpdate() {
    this.validationErrors = {};

    if (this.editProfile.invalid) {
      Object.keys(this.editProfile.controls).forEach((key) => {
        if (this.editProfile.controls[key].invalid) {
          this.validationErrors[key] = [
            `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`,
          ];
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

    if (this.selectedFile) {
      userData.image = this.selectedFile;
    }

    this.userProfileService.updateUser(this.userId, userData).subscribe({
      next: (response) => {
        console.log('Update successful', response);
        this.router.navigate(['/user/payments']);
      },
      error: (error) => {
        this.validationErrors = error.error.errors || {};
        console.error('Update failed', error);
      },
    });
  }
}
