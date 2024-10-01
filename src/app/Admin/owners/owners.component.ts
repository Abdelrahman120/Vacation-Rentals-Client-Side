import { Component } from '@angular/core';
import { AdminServicesService } from '../../services/admin-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [CommonModule],
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

}
