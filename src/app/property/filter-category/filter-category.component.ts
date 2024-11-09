
import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/propertyService/property.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../interface/propertyRelated';
import { FilterService } from '../../services/propertyService/filter.service';

@Component({
  selector: 'app-filter-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.css'],
})
export class FilterCategoryComponent implements OnInit {
  categories: Category[] = [];
  loading: boolean = false;
  properties: any;

  constructor(
    private propertyService: PropertyService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.propertyService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  toggleCategorySelection(selectedCategory: Category) {
    if (selectedCategory.isChecked) {
      selectedCategory.isChecked = false;
    } else {
      this.categories.forEach(category => {
        category.isChecked = category.id === selectedCategory.id;
      });
    }
  }
  

  applyFilter() {
    const selectedCategory = this.categories.find(
      (category) => category.isChecked
    );

    if (!selectedCategory) {
      this.unselectCategory();
      return;
    }

    this.loading = true;
    this.propertyService.getPropertiesByCategory(selectedCategory.id).subscribe(
      (res: any) => {
        this.loading = false;
        this.filterService.updateFilteredProperties(res.data);
        this.properties = res.data;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching filtered properties:', error);
      }
    );
  }

  unselectCategory() {
    this.loading = true;
    this.propertyService.getProperties().subscribe(
      (res: any) => {
        this.loading = false;
        this.filterService.updateFilteredProperties(res.data);
        this.properties = res.data;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching all properties:', error);
      }
    );
  }
}
