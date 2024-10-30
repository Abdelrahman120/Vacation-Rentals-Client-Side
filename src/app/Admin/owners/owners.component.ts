import { Component } from '@angular/core';
import { AdminServices } from '../../services/admin-services.service';
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
  pageNumber = 1;
  constructor(private adminServices: AdminServices) {}

  ngOnInit(): void {
    this.getOwners();
  }

  getOwners(): void {
    this.adminServices.getOwnersUsingPagination(this.pageNumber).subscribe(
      (response) => {
        this.owners = response.data;
      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    );
  }

  paginationPrev() {
    if (this.pageNumber > 1) {
      this.pageNumber -= 1;
      this.getOwners();
    }
  }

  paginationNext() {
    this.pageNumber += 1;
    this.getOwners();
  }

  deleteOwner(id: number): void {
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
