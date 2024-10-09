import { Component } from '@angular/core';
import { UserDetailsService } from '../services/user-details.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  private loadUserId(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.id = userId;
    }
  }
  constructor(private userService: UserDetailsService) {
    this.loadUserId();
  }
  faHeart = faHeart;
  id: string = '';
  user: any = {};
  payments: any[] = [];
  favorites: any[] = [];
  reviews: any[] = [];
  ngOnInit(): void {
    this.userService.getUserWithPayments().subscribe(
      (response) => {
        this.user = response.data;
        this.payments = this.user.payments;
        this.favorites = this.user.favorites;
        this.reviews = this.user.reviews;
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }
}
