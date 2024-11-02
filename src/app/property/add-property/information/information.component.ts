import { CdkStepperNext } from '@angular/cdk/stepper';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../../services/propertyService/property.service';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CdkStepperNext, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent {
  owner_id: string = '';
  categories: any;
  propertyForm!: FormGroup;
  locationSuggestions: any[] = [];
  highlightedIndex: number | null = null;

  @Output() formSubmitted = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private PropertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.propertyForm = this.fb.group({
      headline: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^[a-zA-Z ]+$'),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^[a-zA-Z ]+$'),
        ],
      ],
      bedrooms: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      category_id: ['', Validators.required],
      location: ['', Validators.required],
      bathrooms: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      night_rate: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(10)]],
      sleeps: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
    this.getCategories();
  }

  getCategories() {
    this.PropertyService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  onLocationInput() {
    const query = this.propertyForm.get('location')?.value;
    if (query && query.length > 2) {
      this.PropertyService.getSuggestions(query).subscribe(
        (res: any) => {
          this.locationSuggestions = res;
        },
        (error) => {
          console.error('Error fetching location suggestions:', error);
        }
      );
    } else {
      this.locationSuggestions = [];
    }
  }

  selectLocation(suggestion: any) {
    this.propertyForm.patchValue({ location: suggestion.display_name });
    this.locationSuggestions = [];
    this.highlightedIndex = null;
  }

  submitInfo() {
    if (this.propertyForm.invalid) {
      this.propertyForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    Object.keys(this.propertyForm.value).forEach((key) => {
      formData.append(key, this.propertyForm.get(key)?.value);
    });

    this.PropertyService.addProperty(formData).subscribe(
      (response: any) => {
        const propertyId = response.data['id'];
        this.PropertyService.setPropertyId(propertyId);
        this.formSubmitted.emit();
      },
      (error) => {
        console.error("Error: Property wasn't added:", error);
      }
    );
  }
}
