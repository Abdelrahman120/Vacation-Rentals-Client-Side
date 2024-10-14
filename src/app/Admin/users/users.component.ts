import { Component } from '@angular/core';
import { AdminServices } from '../../services/admin-services.service';
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
  constructor(private adminServices: AdminServices) {}
  users: any[] = [];
  pageNumber = 1;

  ngOnInit() {
    this.getUsers();
  }
  getUsers(): void {
    this.adminServices.getUsersUsingPagination(this.pageNumber).subscribe(
      (response) => {
        this.users = response.data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  paginationPrev() {
    if (this.pageNumber > 1) {
      this.pageNumber -= 1;
      this.getUsers();
    }
  }

  paginationNext() {
    this.pageNumber += 1;
    this.getUsers();
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
