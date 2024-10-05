import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OwnerAuthService } from '../Services/owner-auth.service';
import { environment } from '../../environments/environment.development';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: OwnerAuthService, private router: Router, private route: ActivatedRoute) { }

  submitted = false;
  user: any;

  handleSubmit(form: NgForm) {
    this.submitted = true;
    console.log(form.value);

    this.authService.login(form.value).subscribe(
      (response: any) => {
        if (response) {
          localStorage.setItem('owner_id', response.owner.id);
          localStorage.setItem('user_role', response.owner.role);

          const role = localStorage.getItem('user_role');
          if (role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (role === 'owner') {
            this.router.navigate(['/properties']);
          }
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

  loginWithGoogleForOwner() {
    window.location.href = `${environment.BACKEND_URL}/api/owner/gmail/login`;
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
      const role = params['role'] || 'user'; // Default role is 'user'

      if (token) {
        // Store the token, user data, and role
        localStorage.setItem('token', token);
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
