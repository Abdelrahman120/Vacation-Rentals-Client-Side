import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminServices } from '../services/admin-services.service';
import { SidebarComponent } from '../admin-dashboard/sidebar/sidebar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faClock,
  faXmarkCircle,
  faCircleCheck,
} from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [
    RouterLink,
    SidebarComponent,
    CommonModule,
    DatePipe,
    TruncatePipe,
    FontAwesomeModule,
  ],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css',
})
export class PropertiesComponent {
  properties: any[] = [];
  pageNumber = 1;
  successMessage: string = '';
  faClock = faClock;
  faCircleCheck = faCircleCheck;
  faXmarkCircle = faXmarkCircle;

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
