import { Component } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { Router, RouterLink } from '@angular/router';
import { LoginUserService } from '../services/login-user.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SidebarComponent,RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor (private authService : LoginUserService , private router : Router) {}
  onOwnerLogout() {
    this.authService.logout().subscribe(
      (response) => {
        console.log('Owner Logout successful', response);
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('owner_auth_token'); 
        localStorage.removeItem('role'); 
        this.router.navigate(['/login/owner']); 
      },
      (error) => {
        console.log('Owner Logout failed', error);
      }
    );
  }
}

 