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
  } = {
    startDate: null,
    endDate: null,
    location: '',
    sleeps: '',
  };

  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.input = {
        startDate: params['start_date'] || null,
        endDate: params['end_date'] || null,
        location: params['location'] || '',
        sleeps: params['sleeps'] || '',
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
      },
    });
  }
}
