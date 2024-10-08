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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CdkStepperNext, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css',
})
export class InformationComponent {
  owner_id: string = '';
  categories: any;
  propertyForm!: FormGroup;
  locationSuggestions: any[] = [];
  highlightedIndex: number | null = null;
  property_id: string = "";
  id: string = "";

  @Output() formSubmitted = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private PropertyService: PropertyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.property_id = this.route.snapshot.params["id"];
    this.propertyForm = this.fb.group({
      headline: ['', Validators.required],
      name: ['', Validators.required],
      bedrooms: ['', [Validators.required, Validators.min(1)]],
      category_id: ['', Validators.required],
      location: ['', Validators.required],
      bathrooms: ['', [Validators.required, Validators.min(1)]],
      night_rate: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      sleeps: ['', [Validators.required]],
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

    console.log('log:', query);
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
      console.log('All fields are required');
      return;
    }

    const formData = new FormData();
    Object.keys(this.propertyForm.value).forEach((key) => {
      formData.append(key, this.propertyForm.get(key)?.value);
      console.log(formData);
    });

    this.PropertyService.updateProperty(this.property_id, formData).subscribe(
      (response: any) => {
        console.log(this.property_id);
        this.PropertyService.setPropertyId(this.property_id)
        this.formSubmitted.emit();
      },
      (error) => {
        console.error("Error: Property wasn't added:", error);
      }
    );
  }
}
