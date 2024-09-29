import { Component } from '@angular/core';
import { ReactiveFormsModule,

  FormBuilder,
  FormControl,
  FormGroup, 
  Validators,


} from '@angular/forms';
import { NgIf } from '@angular/common';
// import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  AddForm: FormGroup;
  constructor(private fb: FormBuilder,private router: Router, private categoryService: CategoryService) {
    this.AddForm = this.fb.group({
      name: ['', Validators.required],

    });
  }
  
  
  
  submitted = false
  
  handleSubmit(){
    this.submitted = true;
    if (this.AddForm.valid) {
      const formData = new FormData();
      Object.keys(this.AddForm.value).forEach(key => {
        formData.append(key, this.AddForm.get(key)?.value);
      });

      this.categoryService.addCategory(formData).subscribe(
        response => {
          console.log('Add successful:', response);
          this.router.navigate(['/category']);
        },
        error => {
          console.error('Add failed:', error);
        }
      );
    }
  }

}
