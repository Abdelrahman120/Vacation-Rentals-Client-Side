import { CdkStepper, CdkStepperNext } from '@angular/cdk/stepper';
import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StepperComponent } from '../../stepper/stepper.component';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../../services/propertyService/property.service';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CdkStepperNext, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent {

  propertyForm!: FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();
  constructor(private fb: FormBuilder, private PropertyService: PropertyService) { }

  ngOnInit(): void {
    this.propertyForm = this.fb.group({
      headline: ['', Validators.required],
      name: ['', Validators.required],
      city: ['', Validators.required],
      bedrooms: ['', Validators.required, Validators.min(1)],
      category_id: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      bathrooms: ['', Validators.required, Validators.min(1)],
      night_rate: ['', Validators.required, Validators.min(0)],
      description: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      owner_id: ['', Validators.required,]
    });
  }


  submitInfo() {
    if (this.propertyForm.invalid) {
      this.propertyForm.markAllAsTouched();
      console.log("All fields are required");
      return;
    }
    const formData = new FormData();
    Object.keys(this.propertyForm.value).forEach(key => {
      formData.append(key, this.propertyForm.get(key)?.value);
    });
    this.PropertyService.addProperty(formData).subscribe(
      (response: any) => {
        console.log('property added successfully:', response);
        const propertyId = response.data['id'];
        this.PropertyService.setPropertyId(propertyId);
        this.formSubmitted.emit();
      },
      error => {
        console.error("Error Property wasn't added:", error);
      }
    );
  }
}
