import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css'
})
export class FilterModalComponent {
  priceMin: number | null = null;
  priceMax: number | null = null;
  bedrooms: number | null = null;
  bathrooms: number | null = null;

  @Output() filtersApplied = new EventEmitter<any>();

  applyFilters() {
    try {
      const filters = {
        priceMin: this.priceMin,
        priceMax: this.priceMax,
        bedrooms: this.bedrooms,
        bathrooms: this.bathrooms,
      };
      this.filtersApplied.emit(filters);
      this.closeModal();
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  }
  
  closeModal() {
    const modal = document.getElementById('filterModal');
    if (modal) {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        // في حال لم يتم العثور على مثيل النافذة، قم بإنشاء واحد جديد
        const newModalInstance = new bootstrap.Modal(modal);
        newModalInstance.hide();
      }
    }
  }
}
