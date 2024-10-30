import { Component } from '@angular/core';

@Component({
  selector: 'app-cancle',
  standalone: true,
  imports: [],
  templateUrl: './cancle.component.html',
  styleUrl: './cancle.component.css'
})
export class CancleComponent {
  message = 'Your payment has been cancelled. Please try again.';
}
