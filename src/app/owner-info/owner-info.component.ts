import { Component } from '@angular/core';
import { OwnerInfo } from '../owner-info';
import { OwnerInfoService } from '../services/owner-info.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-owner-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './owner-info.component.html',
  styleUrl: './owner-info.component.css',
})
export class OwnerInfoComponent {
  id: string = '';
  ownerInfo: OwnerInfo | null = null;
  ownerId: number | null = null;

  private loadUserId(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.id = userId;
    }
  }
  constructor(
    private ownerInfoService: OwnerInfoService,
    private router: Router
  ) {
    this.loadUserId();
    const storedOwnerId = localStorage.getItem('ownerid');
    if (storedOwnerId) {
      this.ownerId = +storedOwnerId;
    }
  }

  ngOnInit(): void {
    this.loadOwnerInfo();
  }

  loadOwnerInfo(): void {
    const token = localStorage.getItem('owner_auth_token');
    if (token) {
      this.ownerInfoService.getOwnerInfo(token).subscribe(
        (response: OwnerInfo) => {
          this.ownerInfo = response;
          console.log(this.ownerInfo);
        },
        (error) => {
          console.error('Error fetching owner details', error);
        }
      );
    }
  }

  navigateToEditProfile() {
    if (this.ownerId !== null) {
      this.router.navigate(['/edit-Owner-profile', this.ownerId]);
    } else {
      console.error('Owner ID not found');
    }
  }
}
