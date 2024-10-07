import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminServicesService } from '../services/admin-services.service';
import { SidebarComponent } from "../admin-dashboard/sidebar/sidebar.component";
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [RouterLink, SidebarComponent,NgIf,NgFor , DatePipe],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {
  properties: any[] = [];
  successMessage: string = '';
  constructor (private adminServices : AdminServicesService ) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(status?: string): void {
    this.adminServices.getProperties(status).subscribe(
      (response: any) => {
        this.properties = response.data; // Adjust this based on your API structure
        console.log('Properties loaded:', this.properties);
      },
      error => {
        console.error('Error loading properties:', error);
      }
    );
  }

  filterProperties(status?: string): void {
    this.loadProperties(status);
  }

}