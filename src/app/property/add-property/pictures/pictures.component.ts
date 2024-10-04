import { CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pictures',
  standalone: true,
  imports: [CdkStepperNext, CdkStepperPrevious],
  templateUrl: './pictures.component.html',
  styleUrl: './pictures.component.css'
})
export class PicturesComponent {
  submitPics() { }
}
