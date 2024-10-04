import { CdkStepper } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'], // Fix the property name from styleUrl to styleUrls
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }]
})
export class StepperComponent extends CdkStepper {
  @Input() linearModeSelected = true;
  isReadOnly = true;

  onClick(index: number) {
    this.selectedIndex = index;
  }

  isStepCompleted(index: number): boolean {
    return index < this.selectedIndex; // Return true if the step is completed
  }
}
