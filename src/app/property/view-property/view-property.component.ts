import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/propertyService/property.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf, DecimalPipe } from '@angular/common';
import { FavoriteService } from '../../Services/favorite.service';
import { TestService } from '../../test.service';
import * as L from 'leaflet';
import { UserInfo } from '../../user-info';
import { UserInfoService } from '../../service/user-info.service';
import {
  NgxDaterangepickerBootstrapDirective,
  NgxDaterangepickerBootstrapComponent,
} from 'ngx-daterangepicker-bootstrap';
import moment from 'moment';

@Component({
  selector: 'app-view-property',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    NgFor,
    NgIf,
    DecimalPipe,
    RouterLink,
    NgxDaterangepickerBootstrapDirective,
    NgxDaterangepickerBootstrapComponent,
  ],
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css'],
})
export class ViewPropertyComponent implements OnInit {
  propertyId: string = '';
  canReview: boolean = false;
  propertyDetails: any = {};
  property: any;
  map: any;
  maps: any;
  start_date: string = '';
  end_date: string = '';
  city: string = '';
  sleeps: number = 0;
  reviews: any[] = [];
  newReview: any = {
    rating: 5,
    review: '',
  };
  totalPrice: number = 0;
  user: string = '';
  dates: any = { startDate: null, endDate: null };
  minDate: any;

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private favouriteService: FavoriteService,
    private testService: TestService,
    private userInfoService: UserInfoService
  ) {}
  userDetails: UserInfo['data'] | null = null;

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id') || '';
    const propertyId = this.route.snapshot.params['id'];
    this.minDate = moment();
    console.log('Property ID:', typeof propertyId);
    this.checkIfUserCanReview();
    this.route.queryParams.subscribe((params) => {
      this.dates.startDate = params['start_date']
        ? new Date(params['start_date'])
        : null;
      this.dates.endDate = params['end_date']
        ? new Date(params['end_date'])
        : null;
      this.city = params['city'] || '';
      this.sleeps = +params['sleeps'] || 0;

      this.propertyService
        .viewProperty(this.propertyId)
        .subscribe((res: any) => {
          this.propertyDetails = res.data;
          console.log('Property Details:', this.propertyDetails);
          console.log(this.propertyDetails.images);
          this.calculateTotalPrice();
        });

      this.testService
        .getProperty(Number(this.propertyId))
        .subscribe((data) => {
          this.property = data.data;
          console.log(data.data);

          this.initMap(this.property.latitude, this.property.longitude);
        });
    });

    this.loadReviews();
    const token = localStorage.getItem('token');
    if (token) {
      this.getUserInfo(token);
    }
  }

  getUserInfo(token: string): void {
    this.userInfoService.getUserInfo(token).subscribe(
      (response) => {
        this.userDetails = response.data;
        console.log('User Details:', this.userDetails.id);
      },
      (error) => {
        console.error('Error fetching user info:', error);
      }
    );
  }

  calculateTotalPrice() {
    const start = new Date(this.dates.startDate);
    const end = new Date(this.dates.endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error('Invalid dates');
      this.totalPrice = 0;
      return;
    }

    const timeDifference = end.getTime() - start.getTime();
    const numberOfDays = timeDifference / (1000 * 3600 * 24);

    if (numberOfDays > 0 && this.propertyDetails.night_rate) {
      this.totalPrice = Math.ceil(
        numberOfDays * this.propertyDetails.night_rate
      );
    } else {
      this.totalPrice = 0;
    }

    console.log(`Number of days: ${numberOfDays}`);
    console.log(`Total price: ${this.totalPrice}`);
  }

  onDateChange(): void {
    if (this.dates.startDate && this.dates.endDate) {
      this.start_date = this.dates.startDate.toISOString().split('T')[0];
      this.end_date = this.dates.endDate.toISOString().split('T')[0];
    } else {
      this.start_date = '';
      this.end_date = '';
    }

    this.calculateTotalPrice();
  }

  navigateToPayment() {
    const startDateToSend =
      this.start_date || this.dates.startDate.toISOString().split('T')[0];
    const endDateToSend =
      this.end_date || this.dates.endDate.toISOString().split('T')[0];

    this.router.navigate(['/payment'], {
      queryParams: {
        product_name: this.propertyDetails.name,
        sleeps: this.sleeps,
        total_price: this.totalPrice,
        start_date: startDateToSend,
        end_date: endDateToSend,
        propertyId: this.propertyId,
      },
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
      this.reviews = this.reviews.filter((review) => review.id !== id);
    });
  }

  addReview() {
    const reviewPayload = {
      property_id: Number(this.propertyId),
      rating: this.newReview.rating,
      review: this.newReview.review,
    };

    this.favouriteService.addReview(reviewPayload).subscribe(
      (response) => {
        console.log('Review added successfully:', response);
        this.reviews.push(response);
        this.loadReviews();

        this.newReview = {
          rating: 5,
          review: '',
        };
      },
      (error) => {
        console.error('Error adding review:', error);
      }
    );
  }

  checkIfUserCanReview(): void {
    this.favouriteService.checkBooking(this.propertyId).subscribe(
      (response) => {
        this.canReview = response.canReview;
      },
      (error) => {
        console.error('Error checking booking:', error);
      }
    );
  }

  initMap(lat: number, lng: number): void {
    this.map = L.map('map').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
    L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup('Property Location')
      .openPopup();
  }
}
