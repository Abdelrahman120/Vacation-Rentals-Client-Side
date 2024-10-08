import { Component } from '@angular/core';
import { UserDetailsService } from '../services/user-details.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  constructor (private userService : UserDetailsService) {}
  user: any = {}; // Store user info
  payments: any[] = []; // Store payments
  favorites: any[] = []; // Store favorites
  reviews: any[] = []; // Store reviews
  ngOnInit(): void {
    this.userService.getUserWithPayments().subscribe(
      (response) => {
        this.user = response.data;  // Set user data from the API
        this.payments = this.user.payments; // Set payments from the user data
        this.favorites = this.user.favorites; // Set favorites from the user data
        this.reviews = this.user.reviews; // Set reviews from the user data
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }
}
