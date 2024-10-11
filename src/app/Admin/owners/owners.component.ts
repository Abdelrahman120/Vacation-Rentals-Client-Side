import { Component } from '@angular/core';
import { AdminServicesService } from '../../services/admin-services.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../admin-dashboard/sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterLink, TruncatePipe],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.css',
})
export class OwnersComponent {
  owners: any[] = [];
  constructor(private adminServices: AdminServicesService) {}

  ngOnInit(): void {
    this.getOwners();
  }

  getOwners(): void {
    this.adminServices.getOwners().subscribe(
      (response) => {
        this.owners = response.data; // Access the data from the response object
      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    );
  }

  deleteOwner(id: number): void {
    if (confirm('Are you sure you want to delete this Owner?')) {
      this.adminServices.deleteOwner(id).subscribe(
        (response) => {
          console.log('Owner deleted:', response);
          this.getOwners();
        },
        (error) => {
          console.error('Error deleting Owner:', error);
        }
      );
    }
  }
}
