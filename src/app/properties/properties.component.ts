import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminServicesService } from '../services/admin-services.service';
import { SidebarComponent } from "../admin-dashboard/sidebar/sidebar.component";

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [RouterLink, SidebarComponent],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {
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
  accept(id: number) {
    this.adminServices.acceptProperty(id).subscribe(
      (response) => {
        console.log('Property accepted:', response);
        this.getProperties();
      },
      (error) => {
        console.error('Error accepting property:', error);
      }
    );
  }
  reject(id: number) {
    this.adminServices.rejectProperty(id).subscribe(
      (response) => {
        console.log('Property rejected:', response);
        this.getProperties();
      },
      (error) => {
        console.error('Error rejecting property:', error);
      }
    );
   }
}
