import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/propertyService/property.service';
import { CardItemComponent } from "../property-card/card-item.component";
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../../services/propertyService/filter.service';
import { CommonModule } from '@angular/common';
import { SearchComponent } from "../../search/search.component";
import { FilterComponent } from "../filter/filter.component";
import { FilterCategoryComponent } from "../filter-category/filter-category.component";

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardItemComponent, CommonModule, SearchComponent, FilterComponent, FilterCategoryComponent],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  properties: any[] = [];
  input: any;
  loading: boolean = false;
  isFilteringByCategory: boolean = false;
  noPropertiesInCategory: boolean = false;

  constructor(
    private propertyService: PropertyService,
    private activatedRoute: ActivatedRoute,
    private filterService: FilterService
  ) { }

  trackByPropertyId(index: number, property: any): number {
    return property.id;
  }

  ngOnInit(): void {
    this.filterService.filteredProperties$.subscribe((filteredProperties) => {
      this.isFilteringByCategory = true;

      if (filteredProperties.length > 0) {
        this.properties = filteredProperties;
        this.noPropertiesInCategory = false;
      } else {
        this.properties = [];
        this.noPropertiesInCategory = true;
      }
    });

    this.checkForQueryParamsAndLoadData();
  }

  checkForQueryParamsAndLoadData() {
    this.loading = true;

    this.activatedRoute.queryParams.subscribe((params) => {
      this.input = {
        startDate: params['start_date'],
        endDate: params['end_date'],
        location: params['location'],
        sleeps: params['sleeps'],
      };

      if (this.input.location || this.input.startDate || this.input.endDate) {
        this.filterPropertiesByDate();
      } else {
        this.loadAllProperties();
      }
    });
  }

  filterPropertiesByDate() {
    this.loading = true;
    this.propertyService.getPropertyByDate(this.input).subscribe(
      (res: any) => {
        this.properties = res.data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching properties by date:', error);
        this.loading = false;
      }
    );
  }

  loadAllProperties() {
    this.loading = true;
    this.propertyService.getProperties().subscribe(
      (res: any) => {
        this.properties = Array.isArray(res.data) ? res.data : [];
        this.loading = false;
        this.isFilteringByCategory = false;
      },
      (error) => {
        console.error('Error loading all properties:', error);
        this.loading = false;
      }
    );
  }
}
