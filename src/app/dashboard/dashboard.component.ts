import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserService } from '../Services/login-user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private authService: LoginUserService, private router: Router) {}
  onLogout() {
    this.authService.logout().subscribe(
      (response) => {
        console.log('Logout successful', response);
        // localStorage.removeItem('auth_token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('token'); // Remove token
        this.router.navigate(['/login']); // Redirect to login
      },
      (error) => {
        console.log('Logout failed', error);
      }
    );
  }
}
