import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
// import { CategoryService } from '../category.service';
// import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent  {

  editForm: FormGroup;
  categoryId: string = '';
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
     
    });
  }

  // ngOnInit(): void {
  //   this.categoryId = this.route.snapshot.paramMap.get('id') || '';

   
  //   this.categoryService.getCategory(Number(this.categoryId)).subscribe((category: any) => {
  //     this.editForm.patchValue({
        
  //       name: category.data.name,
  //   });


  // });
  // }

 

  handleSubmit(): void {
    this.submitted = true;
  
    if (this.editForm.valid) {
      const formData = new FormData();
      Object.keys(this.editForm.value).forEach(key => {
        formData.append(key, this.editForm.get(key)?.value);
      });
      formData.append('_method', 'PUT');
      console.log('Form Data:', formData);
  
  //     this.categoryService.updateCategory(Number(this.categoryId),formData).subscribe(
  //       response => {
  //         console.log('Edit successful:', response);
  //         this.router.navigate(['/category']);
  //       },
  //       error => {
  //         console.error('Edit failed:', error.error.errors); 
  //       }
  //     );
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }
  
}

  }}