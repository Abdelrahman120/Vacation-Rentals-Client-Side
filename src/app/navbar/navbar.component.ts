import { Component } from '@angular/core';
import { OwnerAuthService } from '../Services/owner-auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoginUserService } from '../services/login-user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { CommonModule } from '@angular/common';
import { OwnerProfileService } from '../Services/owner-profile.service';
import { UserProfileService } from '../Services/user-profile.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  id: string = '';
  owner: any = {};
  user: any;
  faHeart = faHeart;
  ownerId: number | null = null;

  private loadUserId(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.id = userId;
    }
  }

  constructor(
    private authService: LoginUserService,
    private router: Router,
    private ownerService: OwnerProfileService,
    private userService: UserProfileService
  ) {
    this.loadUserId();
    const storedOwnerId = localStorage.getItem('ownerid');
    if (storedOwnerId) {
      this.ownerId = +storedOwnerId;
    }
  }

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
    this.userService.getUserDetails().subscribe((data) => {
      this.user = data;
    }, (error) => {
      console.log("error loading user details:", error);
      if (error.status === 401) {
        console.log("please login first.");
      }

    });
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
  navigateToEditProfile() {
    if (this.ownerId !== null) {
      this.router.navigate(['/edit-Owner-profile', this.ownerId]);
    } else {
      console.error('Owner ID not found');
    }
  }
}
