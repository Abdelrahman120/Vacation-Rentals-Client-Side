import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {
  products: any[] = [];
  constructor(private router: Router ) {
    
  }
//   ngOnInit(): void {
//    this.productService.getProducts().subscribe((data: any) => {
//      this.products = data.data;
//      // console.log(this.products.data);
     
//    });
// }

confirmDelete(id: number): void {
  const confirmed = window.confirm('Are you sure you want to delete this item?');

  if (confirmed) {
    // this.onDelete(id);
  }
}
// onDelete(id: number) {
//  this.productService.deleteProduct(id).subscribe((data) => {
//    this.update();
//    this.router.navigate(['/product']);

//  })
// }

// update(){
//  this.productService.getProducts().subscribe((data: any) => {
//    this.products = data.data;
// });}


}
