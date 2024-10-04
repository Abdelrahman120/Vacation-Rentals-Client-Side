import { Component, Input } from '@angular/core';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBath, faBed, faHouse } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [DatePipe, FontAwesomeModule, DecimalPipe, NgClass, RouterLink],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})

export class CardItemComponent {
  constructor(private router: Router) { }
  @Input() property: any;
  faHeart = faHeart;
  faBed = faBed;
  faBath = faBath;
  faHouse = faHouse;

  goToDetails(id: string) {
    const queryParams = new URLSearchParams(window.location.search);
    const startDate = queryParams.get('start_date');
    const endDate = queryParams.get('end_date');
    const city = queryParams.get('city');
    const sleeps = queryParams.get('sleeps');

    this.router.navigate(['/property-details', id], {
      queryParams: {
        start_date: startDate,
        end_date: endDate,
        city: city,
        sleeps: sleeps,
      },
    });
  }
}
