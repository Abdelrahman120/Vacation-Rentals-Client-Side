import { Component } from '@angular/core';
import { AdminServicesService } from '../../services/admin-services.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../admin-dashboard/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterModule, TruncatePipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  constructor(private adminServices: AdminServicesService) {}
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
