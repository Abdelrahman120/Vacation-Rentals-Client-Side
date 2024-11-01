import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginUserService } from '../services/login-user.service';
import { CommonModule } from '@angular/common';
import { OwnerProfileService } from '../Services/owner-profile.service';
import { UserProfileService } from '../Services/user-profile.service';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, TruncatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  owner: any = {};
  user: any;
  ownerId: number | null = null;

  constructor(
    private authService: LoginUserService,
    private router: Router,
    private ownerService: OwnerProfileService,
    private userService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.loadOwnerDetails();
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userData = urlParams.get('user');
    if (token) {
      localStorage.setItem('token', token);
      if (userData) {
        this.user = JSON.parse(userData);
      } else {
        this.loadUserDetails();
      }
    } else {
      console.error('No token found. Please log in again.');
    }
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.userService.getUserDetails().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.log('error loading user details:', error);
        if (error.status === 401) {
          console.log('please login first.');
        }
      }
    );
  }

  loadOwnerDetails() {
    this.ownerService.getOwnerDetails().subscribe(
      (data) => {
        this.owner = data;
        console.log(this.owner);
      },
      (error) => {
        console.error('Error fetching owner details:', error);
      }
    );
  }

  isLoggedIn(): boolean {
    return (
      !!localStorage.getItem('owner_auth_token') ||
      !!localStorage.getItem('token')
    );
  }

  isOwner(): boolean {
    return !!localStorage.getItem('owner_auth_token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  isUser(): boolean {
    return !!localStorage.getItem('token') && !this.isOwner();
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
        localStorage.removeItem('ownerid');
        localStorage.removeItem('favoriteProperties');

        if (role === 'admin') {
          this.router.navigate(['/login/owner']);
        } else if (role === 'owner') {
          this.router.navigate(['/login/owner']);
        } else {
          this.router.navigate(['/login']);
          
        }
      },
      (error) => {
        console.log('Logout failed', error);
      }
    );
  }

  navigateToPayments(): void {
    this.router.navigate(['/user/payments']);
  }
  navigateToOwnerProfile(): void {
    this.router.navigate(['owner/info']);
  }
}
