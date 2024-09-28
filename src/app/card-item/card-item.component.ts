import { Component, Input } from '@angular/core';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [DatePipe, FontAwesomeModule, DecimalPipe, NgClass],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})

export class CardItemComponent {
  @Input() property: any;
}
