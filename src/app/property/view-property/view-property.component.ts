import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/propertyService/property.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-view-property',
  standalone: true,
  imports: [FormsModule, DatePipe, NgFor, NgIf , RouterLink],
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {
  propertyId: string = '';
  propertyDetails: any = {};

  start_date: string = '';
  end_date: string = '';
  city: string = '';
  sleeps: number = 0;
  reviews: any[] = [];
  newReview: any = {
    rating: 5,
    review: ''
  };
  totalPrice: number = 0;

  constructor(private propertyService: PropertyService, private route: ActivatedRoute, private router: Router,
    private favouriteService: FavoriteService

  ) { }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id') || '';

    // Capture query parameters
    this.route.queryParams.subscribe(params => {
      this.start_date = params['start_date'] || '';
      this.end_date = params['end_date'] || '';
      this.city = params['city'] || '';
      this.sleeps = +params['sleeps'] || 0;

      console.log("Start Date:", this.start_date);
      console.log("End Date:", this.end_date);
      console.log("City:", this.city);
      console.log("Sleeps:", this.sleeps);

      this.propertyService.viewProperty(Number(this.propertyId)).subscribe((res: any) => {
        this.propertyDetails = res.data;
        console.log("Property Details:", this.propertyDetails);
        console.log(this.propertyDetails.images);
        this.calculateTotalPrice();
      });
    });

    this.loadReviews();
  }

  calculateTotalPrice() {
    const start = new Date(this.start_date);
    const end = new Date(this.end_date);
  
    // Check if the date parsing was successful
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error("Invalid dates");
      this.totalPrice = 0;
      return;
    }
  
    const timeDifference = end.getTime() - start.getTime();
  
    const numberOfDays = timeDifference / (1000 * 3600 * 24);
  
    if (numberOfDays > 0 && this.propertyDetails.night_rate) {
      this.totalPrice = numberOfDays * this.propertyDetails.night_rate;
    } else {
      this.totalPrice = 0;
    }
  
    console.log(`Number of days: ${numberOfDays}`);
    console.log(`Total price: ${this.totalPrice}`);
  }
  

  navigateToPayment() {
    this.router.navigate(['/payment'], {
      queryParams: {
        product_name: this.propertyDetails.name,
        sleeps: this.sleeps,
        total_price: this.totalPrice ,
        start_date: this.start_date,  
        end_date: this.end_date,
        propertyId: this.propertyId  
      }
    });
  }

  loadReviews() {
    this.favouriteService.getReviews(Number(this.propertyId)).subscribe(
      (response) => {


        this.reviews = response;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
  deleteReview(id: number) {
    this.favouriteService.deleteReview(id).subscribe(() => {
      this.reviews = this.reviews.filter(review => review.id !== id);
    });
  }

  addReview() {
    const reviewPayload = {
      property_id: Number(this.propertyId),
      rating: this.newReview.rating,
      review: this.newReview.review
    };

    this.favouriteService.addReview(reviewPayload).subscribe(
      (response) => {
        console.log('Review added successfully:', response);
        // Assuming the response contains the new review data
        this.reviews.push(response);
        this.loadReviews();

        // Reset the form
        this.newReview = {
          rating: 5,
          review: ''
        };
      },
      (error) => {
        console.error('Error adding review:', error);
      }
    );
  }


}
