import { Component } from '@angular/core';
import { AdminServicesService } from '../../services/admin-services.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../admin-dashboard/sidebar/sidebar.component";

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.css'
})
export class OwnersComponent {
  owners: any[] = [];
  constructor(private adminServices : AdminServicesService) { }

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

  deleteUser(id: number): void {
    // if (confirm('Are you sure you want to delete this user?')) {
    //   this.adminServices.deleteUser(id).subscribe(
    //     (response) => {
    //       console.log('User deleted:', response);
    //       this.getUsers();
    //     },
    //     (error) => {
    //       console.error('Error deleting user:', error);
    //     }
    //   );
    // }
  }
}
