import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  NgxDaterangepickerBootstrapDirective,
  NgxDaterangepickerBootstrapComponent,
} from 'ngx-daterangepicker-bootstrap';
import { PropertyService } from '../services/propertyService/property.service';
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
  sleeps = '';
  result: any;
  dates: any = { startDate: null, endDate: null };
  input: any;
  selectedDates: any;
  suggestions: any[] = [];

  constructor(
    private route: Router,
    private propertyService: PropertyService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dates = { startDate: null, endDate: null };
    this.fetchData();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.input = {
        startDate: params['start_date'],
        endDate: params['end_date'],
        location: params['location'],
        sleeps: params['sleeps'],
      };

      if (this.input.startDate && this.input.endDate) {
        this.dates = {
          startDate: new Date(this.input.startDate),
          endDate: new Date(this.input.endDate),
        };
      }

      if (
        this.input.location &&
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
    if (!this.dates || !this.dates.startDate || !this.dates.endDate) {
      console.error('Dates are not selected or initialized!');
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

    this.route.navigate(['/properties'], {
      queryParams: {
        start_date: formatStrDate,
        end_date: formatEndDate,
        location: this.location,
        sleeps: this.sleeps,
      },
    });
  }


  onDateChange() {
    this.search();
  }

  onSleepsChange() {
    this.search();
  }

  fetchData() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.input = {
        startDate: params['start_date'] || null,
        endDate: params['end_date'] || null,
        location: params['location'] || '',
        sleeps: params['sleeps'] || '',
      };

      if (
        this.input.location &&
        this.input.startDate &&
        this.input.endDate
      ) {
        this.propertyService.getPropertyByDate(this.input).subscribe(
          (res: any) => {
            if (res && res.data) {
              this.result = res.data;
            } else {
              console.error('No data received from API');
            }
          },
          (error) => {
            console.error("Error fetching property data:", error);
          }
        );

      }
    });
  }

}


