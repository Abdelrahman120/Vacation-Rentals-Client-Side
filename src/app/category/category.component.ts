import { Component } from '@angular/core';
// import { CategoryService } from '../category.service';
import { RouterLink, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { SidebarComponent } from '../admin-dashboard/sidebar/sidebar.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink, SidebarComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  categories: any[] = [];
  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.data;
    });
  }
  confirmDelete(id: number): void {
    this.onDelete(id);
  }

  onDelete(id: number) {
    this.categoryService.deleteCategory(id).subscribe((data) => {
      this.update();
      this.router.navigate(['/category']);
    });
  }

  update() {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.data;
    });
  }
}
