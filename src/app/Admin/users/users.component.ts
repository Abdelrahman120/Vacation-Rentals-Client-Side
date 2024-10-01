import { Component } from '@angular/core';
import { AdminServicesService } from '../../services/admin-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
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
        this.users = response.data; // Access the data from the response object
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

}
