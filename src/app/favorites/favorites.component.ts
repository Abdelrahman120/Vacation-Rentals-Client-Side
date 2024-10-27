import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../Services/favorite.service';
import { NgFor } from '@angular/common';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faBath, faBed, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgFor, FontAwesomeModule, TruncatePipe],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  favoriteProperties: any[] = [];

  faBed = faBed;
  faBath = faBath;
  faHouse = faHouse;
  faHeart = faHeart;
  constructor(
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoriteService.getUserFavorites().subscribe((favorites: any) => {
      this.favoriteProperties = favorites.data;
      console.log(this.favoriteProperties);
    });
  }
  toggleFavorite(propertyId: number) {
    this.favoriteService.removeFromFavorites(propertyId).subscribe(() => {
      //this.favoriteProperties = this.favoriteProperties.filter(property => property.id !== propertyId);
      this.loadFavorites();
      let favs = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
      if (favs.includes(propertyId)) {
        // If the product is already a favorite, remove it from the array
        favs = favs.filter((favId: number) => favId !== propertyId);
        localStorage.setItem('favoriteProperties', JSON.stringify(favs));  

      }
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['/property-details', id]);
  }
}
