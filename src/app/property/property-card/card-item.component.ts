import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faBath, faBed, faHouse ,faHeart } from '@fortawesome/free-solid-svg-icons';
import { FavoriteService } from '../../Services/favorite.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [
    DatePipe,
    FontAwesomeModule,
    DecimalPipe,
    NgClass,
    RouterLink,
    NgIf,
    NgFor,
    TruncatePipe,
  ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
})
export class CardItemComponent implements OnInit {
  constructor(
    private router: Router,
    private favoriteService: FavoriteService
  ) {}
  @Input() property: any;
  faHeart = faHeart;
  faBed = faBed;
  faBath = faBath;
  faHouse = faHouse;
  favoriteProperties: number[] = [];
  isfavorite: boolean = false;

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
    // this.loadFavorites();
    this.checkIfFavorite();
  }

  // loadFavorites() {
  //   const storedFavorites = localStorage.getItem('favoriteProperties');
  //   if (storedFavorites) {
  //     this.favoriteProperties = JSON.parse(storedFavorites);
  //   } else {
  //     this.favoriteService.getUserFavorites().subscribe((favorites: any) => {
  //       this.favoriteProperties = favorites.map((fav: any) => fav.propertyId);
  //       localStorage.setItem(
  //         'favoriteProperties',
  //         JSON.stringify(this.favoriteProperties)
  //       );
  //     });
  //   }
  // }

  // isFavorite(propertyId: number): boolean {
  //   return this.favoriteProperties.includes(propertyId);
  // }

  // toggleFavorite(propertyId: number) {
  //   if (this.isFavorite(propertyId)) {
  //     this.favoriteService.removeFromFavorites(propertyId).subscribe(() => {
  //       this.favoriteProperties = this.favoriteProperties.filter(
  //         (id) => id !== propertyId
  //       );
  //       this.updateLocalStorage();
  //     });
  //   } else {
  //     this.favoriteService.addToFavorites(propertyId).subscribe(() => {
  //       this.favoriteProperties.push(propertyId);
  //       this.updateLocalStorage();
  //     });
  //   }
  // }

  // updateLocalStorage() {
  //   localStorage.setItem(
  //     'favoriteProperties',
  //     JSON.stringify(this.favoriteProperties)
  //   );
  // }
  toggleFavorites(id: number) {
    let favs = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
    if (favs.includes(id)) {
      // If the product is already a favorite, remove it from the array
      favs = favs.filter((favId: number) => favId !== id);
      this.isfavorite = false;
    } else {
      // If the product is not a favorite, add it to the array
      favs.push(id);
      this.isfavorite = true;
    }
  
    // Update localStorage with the new favorites array
    localStorage.setItem('favoriteProperties', JSON.stringify(favs));  
    this.favoriteService.togleFavorite(id).subscribe(() => {});
  }
  checkIfFavorite() {
    const productId = this.property.id;
    const favorites = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
  
    this.isfavorite = favorites.includes(productId);
  }
}
