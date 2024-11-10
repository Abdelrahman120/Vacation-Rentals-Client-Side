import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OwnerAuthService } from '../Services/owner-auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  imageError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: OwnerAuthService
  ) {
    this.registerForm = this.fb.group(
      {
        company_name: ['', Validators.required],
        name: ['', Validators.required],
        address: ['', Validators.required],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(11),
            Validators.pattern(/^[0-9]*$/),
          ],
        ],
      
        role: ['owner'],
        image: ['', Validators.required],
        gender: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: [
          '',
          [Validators.required, Validators.minLength(8)],
        ],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/png'];

      if (file.size > maxSize) {
        this.imageError = 'File size should not exceed 5 MB.';
        this.registerForm.get('image')?.setErrors({ maxSize: true });
      } else if (!allowedTypes.includes(file.type)) {
        this.imageError = 'Only JPEG and PNG formats are allowed.';
        this.registerForm.get('image')?.setErrors({ invalidType: true });
      } else {
        this.imageError = null;
        this.registerForm.patchValue({
          image: file,
        });
      }
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  handleSubmit() {
    this.submitted = true;

    if (this.registerForm.valid) {
      const formData = new FormData();
      Object.keys(this.registerForm.value).forEach((key) => {
        formData.append(key, this.registerForm.get(key)?.value);
      });

      this.authService.register(formData).subscribe(
        (response: any) => {
          console.log('Registration successful:', response);
          localStorage.setItem('owner_id', response.owner.id);
          this.router.navigate(['/login/owner']);
        },
        (error) => {
          console.error('Registration failed:', error);
          if (error.status === 422 && error.error && error.error.errors) {
            const validationErrors = error.error.errors;
            Object.keys(validationErrors).forEach((key) => {
              const formControl = this.registerForm.get(key);
              if (formControl) {
                const errorMessage = validationErrors[key][0];
                formControl.setErrors({ serverError: errorMessage });
              }
            });
          } else {
            console.error('Something went wrong; please try again later.');
          }
        }
      );
    }
  }
}
