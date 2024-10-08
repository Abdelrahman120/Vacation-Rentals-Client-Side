import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/propertyService/property.service';

@Component({
  selector: 'app-filter-category',
  standalone: true,
  imports: [],
  templateUrl: './filter-category.component.html',
  styleUrl: './filter-category.component.css'
})
export class FilterCategoryComponent implements OnInit {
  constructor(private propertyService: PropertyService) { }
  categories: any;

  ngOnInit(): void {
    this.propertyService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    })
  }
}
