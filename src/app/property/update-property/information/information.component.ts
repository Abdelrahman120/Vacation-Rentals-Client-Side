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
import { Property } from '../../../interface/property';

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
  property_id: string = '';
  id: string = '';
  validationErrors: any = {};

  @Output() formSubmitted = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private PropertyService: PropertyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.property_id = this.route.snapshot.params['id'];
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
    this.getPropertyData(this.property_id);
  }

  getPropertyData(id: string): void {
    this.PropertyService.viewProperty(id).subscribe(
      (response) => {
        this.propertyForm.patchValue({
          headline: response.data.headline,
          name: response.data.name,
          bedrooms: response.data.bedrooms,
          category_id: response.data.category_id,
          location: response.data.location,
          bathrooms: response.data.bathrooms,
          night_rate: Number(response.data.night_rate),
          description: response.data.description,
          sleeps: response.data.sleeps,
        });
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
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

  updateInfo() {
    this.validationErrors = {};

    if (this.propertyForm.invalid) {
      Object.keys(this.propertyForm.controls).forEach((key) => {
        if (this.propertyForm.controls[key].invalid) {
          this.validationErrors[key] = [
            `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`,
          ];
          this.validationErrors[key] = [
            `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`,
          ];
        }
      });
      return;
    }
    const propertyData = this.propertyForm.value;

    this.PropertyService.updateProperty(
      this.property_id,
      propertyData
    ).subscribe(
      (res: any) => {
        console.log('Data Updated Successfully', res);
        this.formSubmitted.emit();
      },
      (err) => console.log(err)
    );
  }
}
