import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBath, faBed, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FavoriteService } from '../../Services/favorite.service';
// import { FavoriteService } from '../../Services/favorite.service';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [DatePipe, FontAwesomeModule, DecimalPipe, NgClass, RouterLink],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})

export class CardItemComponent implements OnInit{
  constructor(private router: Router, private favoriteService:FavoriteService) {
   
   }
  @Input() property: any;
  faHeart = faHeart;
  faBed = faBed;
  faBath = faBath;
  faHouse = faHouse;
  favoriteProperties: number[] = [];

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
  

  ngOnInit() {
    this.loadFavorites(); // Load favorites when the component initializes
  }

  loadFavorites() {
    const storedFavorites = localStorage.getItem('favoriteProperties');
    if (storedFavorites) {
      this.favoriteProperties = JSON.parse(storedFavorites);
    } else {
      this.favoriteService.getUserFavorites().subscribe((favorites: any) => {
        this.favoriteProperties = favorites.map((fav: any) => fav.propertyId);
        localStorage.setItem('favoriteProperties', JSON.stringify(this.favoriteProperties));
      });
    }
  }

  isFavorite(propertyId: number): boolean {
    return this.favoriteProperties.includes(propertyId);
  }

  toggleFavorite(propertyId: number) {
    if (this.isFavorite(propertyId)) {
      // Remove from favorites
      this.favoriteService.removeFromFavorites(propertyId).subscribe(() => {
        this.favoriteProperties = this.favoriteProperties.filter(id => id !== propertyId);
        this.updateLocalStorage();
      });
    } else {
      // Add to favorites
      this.favoriteService.addToFavorites(propertyId).subscribe(() => {
        this.favoriteProperties.push(propertyId);
        this.updateLocalStorage();
      });
    }
  }

  updateLocalStorage() {
    localStorage.setItem('favoriteProperties', JSON.stringify(this.favoriteProperties));
  }

  // goToDetails(id: string) {
  //   this.router.navigate(['/property-details', id]);
  // }
  
  
}
