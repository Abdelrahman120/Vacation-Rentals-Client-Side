import { Component } from '@angular/core';
import { AdminServicesService } from '../../services/admin-services.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../admin-dashboard/sidebar/sidebar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, SidebarComponent , RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor (private adminServices : AdminServicesService) {}
  users: any[] = [];


  ngOnInit() {
    this.getUsers();
    
    
  }
  getUsers(): void {
    this.adminServices.getUsers().subscribe(
      (response) => {
        this.users = response.data; 
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  deleteUser(id: number): void {
    console.log('Attempting to delete user with ID:', id);
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminServices.deleteUser(id).subscribe(
        (response) => {
          console.log('User deleted:', response);
          this.getUsers();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
  
}
