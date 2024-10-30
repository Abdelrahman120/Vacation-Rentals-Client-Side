import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
import { StepperComponent } from '../stepper/stepper.component';
import { InformationComponent } from './information/information.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { ImagesComponent } from './images/images.component';
import { FinishComponent } from './finish/finish.component';

@Component({
  selector: 'app-update-property',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    StepperComponent,
    CdkStepper,
    CdkStep,
    InformationComponent,
    AmenitiesComponent,
    ImagesComponent,
    FinishComponent,
  ],
  templateUrl: './update-property.component.html',
  styleUrl: './update-property.component.css',
})
export class UpdatePropertyComponent {}
