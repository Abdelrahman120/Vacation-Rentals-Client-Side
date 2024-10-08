import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  AddForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.AddForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  handleSubmit() {
    this.submitted = true;
    if (this.AddForm.valid) {
      const formData = new FormData();
      Object.keys(this.AddForm.value).forEach((key) => {
        formData.append(key, this.AddForm.get(key)?.value);
      });

      this.categoryService.addCategory(formData).subscribe(
        (response) => {
          console.log('Add successful:', response);
          this.router.navigate(['/category']);
        },
        (error) => {
          console.error('Add failed:', error);
        }
      );
    }
  }
}
