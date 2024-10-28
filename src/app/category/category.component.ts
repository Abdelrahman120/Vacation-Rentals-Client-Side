import { Component, ViewChild } from '@angular/core';
// import { CategoryService } from '../category.service';
import { RouterLink, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { SidebarComponent } from '../admin-dashboard/sidebar/sidebar.component';
import { Renderer2 } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink, SidebarComponent, ReactiveFormsModule, NgIf],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  @ViewChild('addCategoryModal') addCategoryModal: any;
  categories: any[] = [];
  AddForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private renderer: Renderer2
  ) {
    this.AddForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.data;
    });
    const modalElement = document.getElementById('addCategoryModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.resetForm();
      });
    }
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

  handleSubmit() {
    this.submitted = true;
    if (this.AddForm.valid) {
      const formData = new FormData();
      Object.keys(this.AddForm.value).forEach((key) => {
        formData.append(key, this.AddForm.get(key)?.value);
      });

      this.categoryService.addCategory(formData).subscribe({
        next: (response) => {
          console.log('Add successful:', response);
          this.update();

          const modalElement = document.getElementById('addCategoryModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
              modalInstance.hide();
            }
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
              backdrop.remove();
              const backdrop2 = document.querySelector('.modal-backdrop');
              if (backdrop2) {
                backdrop2.remove();
                document.body.style.overflow = 'auto';
                this.resetForm();
              }
            }
          }
        },
        error: (error) => {
          console.error('Add failed:', error);
        },
      });
    }
  }
  resetForm() {
    this.AddForm.reset();
    this.submitted = false;
  }
}
