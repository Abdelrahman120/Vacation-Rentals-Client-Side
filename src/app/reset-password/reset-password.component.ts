import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OwnerAuthService } from '../Services/owner-auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  imports: [
    FormsModule
  ],
  standalone: true,

})
export class ResetPasswordComponent implements OnInit {
  password: string = '';
  password_confirmation: string = '';
  email: string = '';
  token: string = '';

  constructor(private ownerAuthService: OwnerAuthService, private route: ActivatedRoute ,private router: Router) {}

  ngOnInit() {
    // Capture the token from the route parameters
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });

    // Capture the email from query parameters
    this.route.queryParams.subscribe(queryParams => {
      this.email = queryParams['email'];
    });
  }
  errorMessage: string | null = null;
  onSubmit() {
    if (this.password !== this.password_confirmation) {
      this.errorMessage = 'Passwords do not match.';
      return; // Prevent form submission
    }

    this.ownerAuthService.resetPassword(this.email, this.token, this.password, this.password_confirmation).subscribe({
      next: (response: any) => {
        console.log('Password reset successful', response);
       this.router.navigate(['/login/owner']);
        // Optionally handle success (e.g., redirect or show success message)
      },
      error: (err) => {
        // this.errorMessage = err.error.message || 'An error occurred while resetting the password';
        console.error(err); // Log the error for debugging
      }
    });
  }}
