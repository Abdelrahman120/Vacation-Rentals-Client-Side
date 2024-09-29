import { Component } from '@angular/core';
import { LoginUserService } from '../services/login-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {
  email: string = '';
  password: string = '';
  validationErrors: any = {}; // For handling validation errors
  
  constructor(private loginservice: LoginUserService, private router: Router , private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const name = params['name'];
      const email = params['email'];

      if (token) {
        // Store the token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);

        // Redirect or load user data
        this.router.navigate(['/dashboard']);
      }
    });
  }
  loginWithGoogle() {
    // Redirect to Laravel API for Google OAuth login
    window.location.href = 'http://127.0.0.1:8000/api/gmail/login';
  }
  onLogin() {
    // Client-side validation before sending the request
    this.validationErrors = {}; // Clear any previous errors

    if (!this.email) {
      this.validationErrors.email = 'Email is required';
    } else if (!this.isValidEmail(this.email)) {
      this.validationErrors.email = 'Invalid email format';
    }

    if (!this.password) {
      this.validationErrors.password = 'Password is required';
    }

    // If there are validation errors, return early
    if (Object.keys(this.validationErrors).length > 0) {
      return;
    }

    // Proceed with login if validation passes
    this.loginservice.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.data.token); // Store token
        this.router.navigate(['/dashboard']); // Redirect after successful login
      },
      (error) => {
        console.log('Login failed', error);
        alert('Invalid credentials');
      }
    );
  }

  // Helper function to validate email format
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
