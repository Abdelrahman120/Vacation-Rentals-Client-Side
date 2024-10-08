import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OwnerAuthService } from '../Services/owner-auth.service';
import { NgIf } from '@angular/common';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  faGoogle = faGoogle;
  constructor(
    private authService: OwnerAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  submitted = false;
  user: any;
  errorMessage: string = '';

  handleSubmit(form: NgForm) {
    this.submitted = true;
    console.log(form.value);

    this.authService.login(form.value).subscribe(
      (response: any) => {
        console.log('ddd', response);
        if (response) {
          // localStorage.setItem('id', response.id);
          const role = localStorage.getItem('role');

          if (role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (role === 'owner') {
            this.router.navigate(['/add-property']);
          }
        }
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password';
          console.log(this.errorMessage);
        } else {
          this.errorMessage = 'An unexpected error occurred';
        }
      }
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
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      const name = params['name'];
      const email = params['email'];
      const id = params['id'];
      const role = params['role'] || 'user';

      if (token) {
        localStorage.setItem('owner_auth_token', token);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('ownerid', id);
        localStorage.setItem('role', role);

        if (role === 'owner') {
          this.router.navigate(['/add-property']);
        } else {
          this.router.navigate(['/properties']);
        }
      }
    });
  }
}
