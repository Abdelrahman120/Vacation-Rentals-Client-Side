import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/propertyService/property.service';
import { CardItemComponent } from "../property-card/card-item.component";
import { SearchComponent } from "../../search/search.component";
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../../services/propertyService/filter.service';
import { FilterComponent } from "../filter/filter.component";
import { FilterCategoryComponent } from "../filter-category/filter-category.component"; // Import the service

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardItemComponent, SearchComponent, FilterComponent, FilterCategoryComponent],

  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  properties: any[] = [];
  input: any;

  constructor(
    private propertyService: PropertyService,
    private activatedRoute: ActivatedRoute,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.filterService.filteredProperties$.subscribe(filteredProperties => {
      if (filteredProperties.length > 0) {
        this.properties = filteredProperties;
      } else {
        this.loadData();
      }
    });
  }

  loadData() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.input = {
        startDate: params['start_date'],
        endDate: params['end_date'],
        destination: params["city"],
        sleeps: params["sleeps"]
      };

      if (this.input.destination && this.input.startDate && this.input.endDate) {
        this.propertyService.getPropertyByDate(this.input).subscribe((res: any) => {
          this.properties = res.data;
          console.log(res.data);
        });
      }
      else if (!this.input.destination && !this.input.startDate && !this.input.endDate) {
        this.propertyService.getProperties().subscribe((res: any) => {
          this.properties = res.data;
          console.log(this.properties[0]['images'][0].image);
        });
      }
    });
  }
}
