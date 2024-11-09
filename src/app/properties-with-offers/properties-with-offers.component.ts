import { Component } from '@angular/core';
import { PropertyService } from '../services/propertyService/property.service';
import { FilterService } from '../services/propertyService/filter.service';
import { Category } from '../interface/propertyRelated';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-properties-with-offers',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './properties-with-offers.component.html',
  styleUrl: './properties-with-offers.component.css'
})
export class PropertiesWithOffersComponent {
  categories: Category[] = [];
  loading: boolean = false;
  properties: any;
  selectedOffer: string = '';
  constructor(
    private propertyService: PropertyService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.propertyService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
  }
  applyOfferFilter() {
    if (this.selectedOffer === 'yes') {
      this.propertyService.getPropertiesByOffer('yes').subscribe(
        (res: any) => {
          this.loading = false;
          this.properties = res.data;
          this.filterService.updateFilteredProperties(res.data);
        },
        (error) => {
          this.loading = false;
          console.error('Error fetching properties with offer:', error);
        }
      );
    } else if (this.selectedOffer === 'no') {
      this.loadAllProperties();
    } else {
      this.loadAllProperties();
    }
  }

  loadAllProperties() {
    this.loading = true;
    this.propertyService.getProperties().subscribe(
      (res: any) => {
        this.loading = false;
        this.properties = res.data;
        this.filterService.updateFilteredProperties(res.data);
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching all properties:', error);
      }
    );
  }
}
