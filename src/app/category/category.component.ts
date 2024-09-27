import { Component } from '@angular/core';
// import { CategoryService } from '../category.service';
import { RouterLink , Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories: any[] = [];
   constructor( private router: Router) {
     
   }
//    ngOnInit(): void {
//     this.categoryService.getCategories().subscribe((data: any) => {
//       this.categories = data.data;
//       // console.log(this.categories.data);
      
//     });
// }
confirmDelete(id: number): void {
  const confirmed = window.confirm('Are you sure you want to delete this item?');

  if (confirmed) {
    // this.onDelete(id);
  }
}

// onDelete(id: number) {
//   this.categoryService.deleteCategory(id).subscribe((data) => {
//     this.update();
//     this.router.navigate(['/category']);

//   })
// }

// update(){
//   this.categoryService.getCategories().subscribe((data: any) => {
//     this.categories = data.data;
// });}


}