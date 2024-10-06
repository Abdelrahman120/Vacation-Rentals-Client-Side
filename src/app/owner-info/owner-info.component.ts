import { Component } from '@angular/core';
import { OwnerInfo } from '../owner-info';
import { OwnerInfoService } from '../services/owner-info.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-info.component.html',
  styleUrl: './owner-info.component.css'
})
export class OwnerInfoComponent {
  ownerInfo: OwnerInfo | null = null; // Declare ownerInfo to hold owner info

  constructor(private ownerInfoService: OwnerInfoService) {}

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
}
