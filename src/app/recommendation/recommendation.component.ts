import { Component } from '@angular/core';
import { PropertyService } from '../services/propertyService/property.service';
import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faBath, faBed, faHouse } from '@fortawesome/free-solid-svg-icons';
import { CardItemComponent } from '../property/property-card/card-item.component';
import { FavoriteService } from '../Services/favorite.service';
declare var $: any;
@Component({
  selector: 'app-recommendation',
  standalone: true,
  imports: [
    DatePipe,
    FontAwesomeModule,
    DecimalPipe,
    NgClass,
    RouterLink,
    NgIf,
    NgFor,
    CardItemComponent,
  ],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.css',
})
export class RecommendationComponent {
  properties: any[] = [];
  constructor(
    private router: Router,
    private favoriteService: FavoriteService,
    protected propertyService: PropertyService
  ) {}

  faHeart = faHeart;
  faBed = faBed;
  faBath = faBath;
  faHouse = faHouse;
  ngOnInit(): void {
    this.propertyService.getProperties().subscribe((data: any) => {
      this.properties = data.data;
      console.log(this.properties);
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      $('.carousel').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1230,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1050,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }, 1000);
  }
  toggleFavorites(propertyId: number) {
    this.favoriteService.toggleFavorite(propertyId).subscribe(() => {});
  }
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
