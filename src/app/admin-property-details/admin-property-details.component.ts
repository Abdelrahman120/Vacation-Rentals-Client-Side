import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServicesService } from '../services/admin-services.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-property-details',
  standalone: true,
  imports: [DatePipe,NgIf,NgFor,FormsModule],
  templateUrl: './admin-property-details.component.html',
  styleUrl: './admin-property-details.component.css'
})
export class AdminPropertyDetailsComponent {
  property: any = {
    status: '', // Initialize status to handle the binding
  };  
  constructor(private route: ActivatedRoute, private propertyService: AdminServicesService,private router : Router) {}
  ngOnInit(): void {
    const propertyId = this.route.snapshot.paramMap.get('id');
    this.loadPropertyDetails(propertyId);
  }

  loadPropertyDetails(id: string | null): void {
        this.propertyService.getPropertyDetails(Number(id)).subscribe((response) => {
      this.property = response.data;

      console.log(this.property);
    });
  }

  updateStatus(statusForm: NgForm): void {
    if (statusForm.valid) {
      const formData = new FormData();
      formData.append('status', this.property.status);
      formData.append('_method', 'PATCH');

      this.propertyService.updatePropertyStatus(this.property.id, formData).subscribe({
        next: (response) => {
          console.log('Status updated successfully:', response);
          // Optionally show a success message to the user
          this.router.navigate(['/send-email', this.property.owner_id]); // Adjust the route path as needed
        },
        error: (error) => {
          console.error('Error updating status:', error);
          // Optionally show an error message to the user
        }
      });
    } else {
      console.log('Form is invalid');
      // Handle form invalid case (e.g., show a message to the user)
    }}
  deleteComment(id: number): void {
   
  }
}
