import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  NgxDaterangepickerBootstrapDirective,
  NgxDaterangepickerBootstrapComponent,
  NgxDaterangepickerBootstrapModule,
} from 'ngx-daterangepicker-bootstrap';
import { PropertyService } from '../services/propertyService/property.service';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { BookingAndBlocksService } from '../services/booking-and-blocks.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    NgxDaterangepickerBootstrapDirective,
    NgxDaterangepickerBootstrapComponent,
    NgxDaterangepickerBootstrapModule,
    CommonModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  location: string = '';
  sleeps: string = '';
  bedrooms: string = '';
  bathrooms: string = '';
  price_min: string = '';
  price_max: string = '';
  result: any[] = [];
  suggestions: any[] = [];
  dates: { startDate: moment.Moment | null; endDate: moment.Moment | null } = {
    startDate: moment().startOf('day'),
    endDate: moment().endOf('day'),
  };

  input: {
    startDate: string | null;
    endDate: string | null;
    location: string;
    sleeps: string;
    bedrooms: string;
    bathrooms: string;
    price_min: string;
    price_max: string;
  } = {
    startDate: null,
    endDate: null,
    location: '',
    sleeps: '',
    bedrooms: '',
    bathrooms: '',
    price_min: '',
    price_max: '',
  };
  minDate: any;
  blockedDatesSet = new Set<string>();

  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private activatedRoute: ActivatedRoute,
    private bookingAndBlocksService: BookingAndBlocksService
  ) {}

  ngOnInit(): void {
    this.minDate = moment();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.input = {
        startDate: params['start_date'] || null,
        endDate: params['end_date'] || null,
        location: params['location'] || '',
        sleeps: params['sleeps'] || '',
        bedrooms: params['bedrooms'] || '',
        bathrooms: params['bathrooms'] || '',
        price_min: params['price_min'] || '',
        price_max: params['price_max'] || '',
      };

      if (this.input.startDate && this.input.endDate) {
        this.dates = {
          startDate: moment(this.input.startDate),
          endDate: moment(this.input.endDate),
        };
      } else {
        this.dates = { startDate: null, endDate: null };
      }

      if (this.input.location && this.dates.startDate && this.dates.endDate) {
        this.fetchData();
      }
    });
  }

  fetchBlockedDates(id: string): void {
    this.bookingAndBlocksService
      .getEvents(id)
      .subscribe(([blocks, bookings]) => {
        const allBlockedDates = [...blocks, ...bookings].map(
          (event) => event.date
        );
        this.blockedDatesSet = new Set(
          allBlockedDates.map((date) => new Date(date).toDateString())
        );
      });
  }

  isDateBlocked(date: Date): boolean {
    return this.blockedDatesSet.has(date.toDateString());
  }

  onDateChange(): void {
    console.log('Date range changed:', this.dates);
  }

  fetchData(): void {
    this.propertyService.getPropertyByDate(this.input).subscribe(
      (res: any) => {
        if (res && res.data) {
          this.result = res.data;
          console.log('API Search result:', this.result);
        } else {
          console.error('No data received from API');
        }
      },
      (error) => {
        console.error('Error fetching property data:', error);
      }
    );
  }

  getLocationSuggestions(): void {
    if (this.location.length > 0) {
      this.propertyService.getSuggestions(this.location).subscribe(
        (res: any) => {
          console.log('API Response:', res);
          this.suggestions = res;
        },
        (error) => {
          console.error('Error fetching suggestions', error);
          this.suggestions = [];
        }
      );
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: any): void {
    this.location = suggestion.display_name;
    this.suggestions = [];
  }

  search(): void {
    if (!this.dates.startDate || !this.dates.endDate) {
      console.error('Dates are not selected or initialized!');
      return;
    }

    const formattedStartDate = this.dates.startDate.format('YYYY-MM-DD');
    const formattedEndDate = this.dates.endDate.format('YYYY-MM-DD');

    if (this.dates.startDate.isAfter(this.dates.endDate)) {
      console.error('Start date cannot be later than end date');
      return;
    }

    if (!this.location) {
      console.error('Location is not selected!');
      return;
    }

    this.router.navigate(['/properties'], {
      queryParams: {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        location: this.location,
        sleeps: this.sleeps,
        bedrooms: this.bedrooms,
        bathrooms: this.bathrooms,
        price_min: this.price_min,
        price_max: this.price_max,
      },
    });
  }
  showFilter: boolean = false;

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }
}
