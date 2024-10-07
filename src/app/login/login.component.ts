import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OwnerAuthService } from '../Services/owner-auth.service';
import { environment } from '../../environments/environment.development';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: OwnerAuthService, private router: Router, private route: ActivatedRoute) { }

  submitted = false;
  user: any;
  errorMessage: string = '';

  handleSubmit(form: NgForm) {
    this.submitted = true;
    console.log(form.value);

    this.authService.login(form.value).subscribe(
      (response: any) => {
        if (response) {
          const role = localStorage.getItem('role');

          if (role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (role === 'owner') {
            this.router.navigate(['/owner-dashboard']);
          }
        }
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password';
          console.log(this.errorMessage);
          
        } else {
          this.errorMessage = 'An unexpected error occurred';
        }        }
    );
  }

  loginWithGoogleForOwner() {
    window.location.href = `http://127.0.0.1:8000/api/owner/gmail/login`;
  }

  canActivate(): boolean {
    const role = localStorage.getItem('role');
    return role === 'owner';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const name = params['name'];
      const email = params['email'];
      const role = params['role'] || 'user'; 

      if (token) {
        // Store the token, user data, and role
        localStorage.setItem('owner_auth_token', token);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('role', role); // Store the role (user or owner)

        // Redirect based on the role (you can customize this part)
        if (role === 'owner') {
          this.router.navigate(['/owner-dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      }
    });
  }
}
