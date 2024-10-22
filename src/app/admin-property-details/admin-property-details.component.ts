import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServices } from '../services/admin-services.service';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FavoriteService } from '../Services/favorite.service';

@Component({
  selector: 'app-admin-property-details',
  standalone: true,
  imports: [DatePipe, NgIf, NgFor, FormsModule, CurrencyPipe],
  templateUrl: './admin-property-details.component.html',
  styleUrl: './admin-property-details.component.css',
})
export class AdminPropertyDetailsComponent {
  property: any = {
    status: '',
  };
  constructor(
    private route: ActivatedRoute,
    private propertyService: AdminServices,
    private router: Router,
    private favoriteService: FavoriteService
  ) {}
  reviews: any[] = [];
  ngOnInit(): void {
    const propertyId = this.route.snapshot.paramMap.get('id');
    this.loadPropertyDetails(propertyId);
    this.loadReviews(propertyId);
  }

  loadPropertyDetails(id: string | null): void {
    this.propertyService
      .getPropertyDetails(Number(id))
      .subscribe((response) => {
        this.property = response.data;

        console.log(this.property);
      });
  }

  updateStatus(statusForm: NgForm): void {
    if (statusForm.valid) {
      const formData = new FormData();
      formData.append('status', this.property.status);
      formData.append('_method', 'PATCH');

      this.propertyService
        .updatePropertyStatus(this.property.id, formData)
        .subscribe({
          next: (response) => {
            console.log('Status updated successfully:', response);

            this.router.navigate(['/send-email', this.property.owner_id]);
          },
          error: (error) => {
            console.error('Error updating status:', error);
          },
        });
    } else {
      console.log('Form is invalid');
    }
  }
  loadReviews(propertyId: string | null) {
    this.favoriteService.getReviews(Number(propertyId)).subscribe(
      (response) => {
        this.reviews = response;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
  deleteComment(id: number): void {
    this.favoriteService.deleteReview(id).subscribe(() => {
      this.reviews = this.reviews.filter((review) => review.id !== id);
    });
  }
}
