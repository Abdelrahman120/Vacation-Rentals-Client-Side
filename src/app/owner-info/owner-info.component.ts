import { Component } from '@angular/core';
import { OwnerInfo } from '../owner-info';
import { OwnerInfoService } from '../services/owner-info.service';
import { CommonModule } from '@angular/common';
import { OwnerProfileService } from '../Services/owner-profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-owner-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-info.component.html',
  styleUrl: './owner-info.component.css'
})
export class OwnerInfoComponent {
  ownerInfo: OwnerInfo | null = null; // Declare ownerInfo to hold owner info

  constructor(private snackBar: MatSnackBar,private ownerInfoService: OwnerInfoService , private ownerProfile : OwnerProfileService) {}

  ngOnInit(): void {
    this.loadOwnerInfo();
  }

  loadOwnerInfo(): void {
    const token = localStorage.getItem('owner_auth_token'); // Retrieve the token from local storage
    if (token) {
      this.ownerInfoService.getOwnerInfo(token).subscribe(
        (response: OwnerInfo) => {
          this.ownerInfo = response; // Assign owner details
          console.log(this.ownerInfo);
        },
        error => {
          console.error('Error fetching owner details', error);
        }
      );
    }
  }
  deleteProperty(propertyId: number): void {
    // Step 1: Show confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this property?');
    
    if (isConfirmed) {
      // Step 2: Proceed with deletion if the user confirmed
      this.ownerProfile.deleteProperty(propertyId).subscribe(
        (response) => {
        this.loadOwnerInfo();
        this.showSuccessMessage();
        },
        (error) => {
          console.error('Error deleting property:', error);
        }
      );
    } else {
      console.log('Deletion canceled by the user');
    }
  }
  showNotification = false;
  showSuccessMessage(): void {
    this.showNotification = true;  
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}
