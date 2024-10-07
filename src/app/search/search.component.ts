import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  NgxDaterangepickerBootstrapDirective,
  NgxDaterangepickerBootstrapComponent,
} from 'ngx-daterangepicker-bootstrap';
import { PropertyService } from '../Services/propertyService/property.service';
import { format } from 'date-fns';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    NgxDaterangepickerBootstrapDirective,
    NgxDaterangepickerBootstrapComponent,
    CommonModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  location = '';
  travelers = '';
  result: any;
  dates: any = { startDate: null, endDate: null };
  input: any;
  selectedDates: any;
  destination: any;
  suggestions: any[] = [];

  constructor(
    private route: Router,
    private propertyService: PropertyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.input = {
        startDate: params['start_date'],
        endDate: params['end_date'],
        destination: params['city'],
        sleeps: params['sleeps'],
      };

      if (
        this.input.destination &&
        this.input.startDate &&
        this.input.endDate
      ) {
        this.propertyService
          .getPropertyByDate(this.input)
          .subscribe((res: any) => {
            this.result = res.data;
          });
      }
    });
  }

  getLocationSuggestions() {
    if (this.location.length > 0) {
      this.propertyService.getSuggestions(this.location).subscribe(
        (res: any) => {
          console.log('Response from API:', res);
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


  selectSuggestion(suggestion: any) {
    this.location = suggestion.display_name;
    this.suggestions = [];
    this.search();
  }

  search() {
    if (!this.dates.startDate || !this.dates.endDate) {
      console.error('Dates are not selected!');
      return;
    }

    const strDate = this.dates.startDate?.['$d'];
    const endDate = this.dates.endDate?.['$d'];

    if (!strDate || !endDate) {
      console.error('Invalid date values!');
      return;
    }

    const formatStrDate = format(strDate, 'yyyy-MM-dd');
    const formatEndDate = format(endDate, 'yyyy-MM-dd');

    if (new Date(formatStrDate) > new Date(formatEndDate)) {
      console.error('Start date cannot be later than end date');
      return;
    }

    this.selectedDates = {
      startDate: formatStrDate,
      endDate: formatEndDate,
    };

    if (!this.location) {
      console.error('Location is not selected!');
      return;
    }

    this.destination = this.location.toLowerCase();

    this.route.navigate(['/properties'], {
      queryParams: {
        start_date: formatStrDate,
        end_date: formatEndDate,
        city: this.destination,
        sleeps: this.travelers,
      },
    });
  }

  onDateChange() {
    this.search();
  }

  onTravelersChange() {
    this.search();
  }

  fetchData() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.input = {
        startDate: params['start_date'],
        endDate: params['end_date'],
        destination: params['city'],
        sleeps: params['sleeps'],
      };

      if (
        this.input.destination &&
        this.input.startDate &&
        this.input.endDate
      ) {
        this.propertyService
          .getPropertyByDate(this.input)
          .subscribe((res: any) => {
            this.result = res.data;
          });
      }
    });
  }
}


