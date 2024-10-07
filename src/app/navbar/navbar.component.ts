import { Component } from '@angular/core';
import { OwnerAuthService } from '../Services/owner-auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoginUserService } from '../services/login-user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,FontAwesomeModule , CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  faHeart=faHeart;
  constructor (private authService : LoginUserService , private router : Router) {}
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('owner_auth_token') || !!localStorage.getItem('token');
  }
  onLogout(): void {
    this.authService.logout().subscribe(
      (response) => {
        console.log('Logout successful', response);
          const role = localStorage.getItem('role');
  
          localStorage.removeItem('userName');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('owner_auth_token');
          localStorage.removeItem('role');
  
        if (role === 'admin') {
          this.router.navigate(['/login/owner']);
        } else if (role === 'owner') {
          this.router.navigate(['/login/owner']); 
          
        }
        else{
          this.router.navigate(['/login']); 

          }
      },
      (error) => {
        console.log('Logout failed', error);
      }
    );
  }
  
}

