import { Component, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
import { StepperComponent } from "../stepper/stepper.component";
import { InformationComponent } from "./information/information.component";
import { AmenitiesComponent } from "./amenities/amenities.component";
import { PicturesComponent } from "./pictures/pictures.component";
import { FinishComponent } from "./finish/finish.component";

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, StepperComponent, CdkStepper, CdkStep, InformationComponent, AmenitiesComponent, PicturesComponent, FinishComponent],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent {

}
