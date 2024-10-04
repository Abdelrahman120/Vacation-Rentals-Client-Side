import { Component } from '@angular/core';
import { LoginUserService } from '../Services/login-user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
})
export class LoginUserComponent {
  email: string = '';
  password: string = '';
  validationErrors: any = {};

  constructor(
    private loginservice: LoginUserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      const name = params['name'];
      const email = params['email'];

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);

        this.router.navigate(['/dashboard']);
      }
    });
  }
  loginWithGoogle() {
    window.location.href = 'http://127.0.0.1:8000/api/gmail/login';
  }
  onLogin() {
    this.validationErrors = {};

    if (!this.email) {
      this.validationErrors.email = 'Email is required';
    } else if (!this.isValidEmail(this.email)) {
      this.validationErrors.email = 'Email is not valid';
    }

    if (!this.password) {
      this.validationErrors.password = 'password is required';
    } else if (this.password.length < 8) {
      this.validationErrors.password = 'password must be at least 8 characters';
    }

    if (Object.keys(this.validationErrors).length > 0) {
      return;
    }

    this.loginservice.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.data.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log('Login failed', error);
      }
    );
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
