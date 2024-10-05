import { Component } from '@angular/core';
import { OwnerAuthService } from '../Services/owner-auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoginUserService } from '../services/login-user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor (private authService : LoginUserService , private router : Router) {}
  
  onLogout(): void {
    this.authService.logout().subscribe(
      (response) => {
        console.log('Logout successful', response);
          const role = localStorage.getItem('role');
  
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('token');
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
