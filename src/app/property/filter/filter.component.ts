import { Component } from '@angular/core';
import { PropertyService } from '../../services/propertyService/property.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Amenity } from '../../interface/propertyRelated';
import { FilterService } from '../../services/propertyService/filter.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  amenities: Amenity[] = [];
  loading: boolean = false;

  constructor(
    private propertyService: PropertyService,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.getAmenities();
  }

  getAmenities() {
    this.propertyService.getAmenities().subscribe((res: any) => {
      this.amenities = res.data;
    });
  }

  filterByAmenity() {
    this.loading = true;
    const selectedAmenityIds = this.amenities
      .filter((amenity) => amenity.isChecked)
      .map((amenity) => amenity.id);

    if (selectedAmenityIds.length === 0) {
      this.loading = false;
      console.error('No amenities selected');
      return;
    }

    this.propertyService.getPropertiesByAmenity(selectedAmenityIds).subscribe(
      (res: any) => {
        this.loading = false;
        console.log('Filtered Properties:', res.data);
        this.filterService.updateFilteredProperties(res.data);
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching filtered properties:', error);
      }
    );
  }
}
