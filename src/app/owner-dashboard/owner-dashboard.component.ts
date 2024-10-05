import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserService } from '../services/login-user.service';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './owner-dashboard.component.html',
  styleUrl: './owner-dashboard.component.css'
})
export class OwnerDashboardComponent {
  constructor(private authService: LoginUserService, private router: Router) { }
  onOwnerLogout() {
    this.authService.logout().subscribe(
      (response) => {
        console.log('Owner Logout successful', response);
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('token'); 
        localStorage.removeItem('role'); 
        this.router.navigate(['/login/owner']); 
      },
      (error) => {
        console.log('Owner Logout failed', error);
      }
    );
  }
}
