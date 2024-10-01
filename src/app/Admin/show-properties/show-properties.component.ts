import { Component } from '@angular/core';
import { AdminServicesService } from '../../services/admin-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-properties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-properties.component.html',
  styleUrl: './show-properties.component.css'
})
export class ShowPropertiesComponent {
  properties: any[] = [];
  constructor (private adminServices : AdminServicesService ) {}

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties(): void {
    this.adminServices.getProperties().subscribe(
      (response) => {
        this.properties = response.data; // Access the data from the response object
      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );
  }

}
