import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminServices } from '../services/admin-services.service';
import { SidebarComponent } from '../admin-dashboard/sidebar/sidebar.component';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [RouterLink, SidebarComponent, NgIf, NgFor, DatePipe, TruncatePipe],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css',
})
export class PropertiesComponent {
  properties: any[] = [];
  pageNumber = 1;
  successMessage: string = '';
  constructor(private adminServices: AdminServices) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(status?: string): void {
    this.adminServices
      .getPropertiesUsingPagination(this.pageNumber, status)
      .subscribe(
        (response: any) => {
          this.properties = response.data;
        },
        (error) => {
          console.error('Error loading properties:', error);
        }
      );
  }

  paginationPrev() {
    if (this.pageNumber > 1) {
      this.pageNumber -= 1;
      this.loadProperties();
    }
  }

  paginationNext() {
    this.pageNumber += 1;
    this.loadProperties();
  }

  filterProperties(status?: string): void {
    this.loadProperties(status);
  }
}
