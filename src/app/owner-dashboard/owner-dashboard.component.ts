import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserService } from '../Services/login-user.service';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './owner-dashboard.component.html',
  styleUrl: './owner-dashboard.component.css'
})
export class OwnerDashboardComponent {
  constructor(private authService: LoginUserService, private router: Router ) {}
  onOwnerLogout() {
    this.authService.logout().subscribe(
      (response) => {
        console.log('Owner Logout successful', response);
        // Remove the relevant local storage items for the owner
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('token'); // Remove token
        localStorage.removeItem('role'); // Remove role if stored
        this.router.navigate(['/login/owner']); // Redirect to login
      },
      (error) => {
        console.log('Owner Logout failed', error);
      }
    );
  }
}
