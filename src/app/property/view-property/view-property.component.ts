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
import { BookingAndBlocksService } from '../../services/booking-and-blocks.service';

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
  blockedDatesSet = new Set<string>();
  datePickerOptions = {
    autoApply: true,
    isInvalidDate: (date: moment.Moment) => this.isDateBlocked(date),
  };
  isAvailable: any;
  maxSleeps: number = 0;
  isOverMaxSleep = false;

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private favouriteService: FavoriteService,
    private testService: TestService,
    private userInfoService: UserInfoService,
    private bookingAndBlocksService: BookingAndBlocksService
  ) {}
  userDetails: UserInfo['data'] | null = null;

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id') || '';
    const propertyId = this.route.snapshot.params['id'];
    this.minDate = moment();
    this.checkIfUserCanReview();
    this.fetchBlockedDates(this.propertyId);
    this.route.queryParams.subscribe((params) => {
      this.dates.startDate = params['start_date']
        ? new Date(params['start_date'])
        : null;
      this.dates.endDate = params['end_date']
        ? new Date(params['end_date'])
        : null;
      this.city = params['city'] || '';
      this.sleeps = +params['sleeps'] || 1;

      if (this.dates.startDate && this.dates.endDate) {
        this.checkIfAvailable(
          this.propertyId,
          this.dates.startDate,
          this.dates.endDate
        );
      } else {
        this.isAvailable = null;
      }

      this.propertyService
        .viewProperty(this.propertyId)
        .subscribe((res: any) => {
          this.propertyDetails = res.data;
          this.maxSleeps = res.data.sleeps;
          this.calculateTotalPrice();
        });

      this.testService
        .getProperty(Number(this.propertyId))
        .subscribe((data) => {
          this.property = data.data;

          this.initMap(this.property.latitude, this.property.longitude);
        });
    });

    this.loadReviews();
    const token = localStorage.getItem('token');
    if (token) {
      this.getUserInfo(token);
    }
  }

  fetchBlockedDates(id: string): void {
    this.bookingAndBlocksService
      .getEvents(id)
      .subscribe(([blocks, bookings]) => {
        const allBlockedDates = [...blocks, ...bookings].map((event) => {
          console.log('event dates: ', event);

          return moment(event.date).format('YYYY-MM-DD');
        });
        this.blockedDatesSet = new Set(allBlockedDates);
      });
    console.log('Blocked Dates Set:', this.blockedDatesSet);
  }

  isDateBlocked = (date: moment.Moment): boolean => {
    return this.blockedDatesSet.has(date.format('YYYY-MM-DD'));
  };

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

    if (numberOfDays > 0 && this.propertyDetails.total_price) {
      const baseTotal = Math.floor(
        numberOfDays * this.propertyDetails.total_price
      );
      if (this.isOfferActive() && this.propertyDetails.offer > 0) {
        this.totalPrice = Math.floor(
          baseTotal * (1 - this.propertyDetails.offer / 100)
        );
      } else {
        this.totalPrice = Math.floor(baseTotal);
      }
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

    this.checkIfAvailable(
      this.propertyId,
      new Date(this.start_date),
      new Date(this.end_date)
    );
  }

  onSleepsChange() {
    console.log('Sleeps: ', this.sleeps, this.maxSleeps);

    this.isOverMaxSleep = this.sleeps > this.maxSleeps;
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

  checkIfAvailable(id: string, startDate: Date, endDate: Date) {
    const dates = {
      start_date: startDate,
      end_date: endDate,
    };
    this.propertyService.checkIfPropertyAvailable(id, dates).subscribe({
      next: (res: any) => {
        this.isAvailable = res.available;
        console.log('property availability: ', res.available);
      },
      error: (err: any) => {
        //
      },
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
  getOfferPrice(): number {
    return this.isOfferActive()
      ? this.property.night_rate * (1 - this.property.offer / 100)
      : this.property.night_rate;
  }
  isOfferActive(): boolean {
    const today = new Date();
    const startDate = new Date(this.property.offer_start_date);
    const endDate = new Date(this.property.offer_end_date);
    return today >= startDate && today <= endDate;
  }
}