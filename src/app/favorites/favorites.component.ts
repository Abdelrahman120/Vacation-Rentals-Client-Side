import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../Services/favorite.service';
import { NgFor } from '@angular/common';
import { CardItemComponent } from "../property/property-card/card-item.component";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBath, faBed, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgFor, CardItemComponent,FontAwesomeModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  favoriteProperties: any[] = [];

  faBed = faBed;
  faBath = faBath;
  faHouse = faHouse;
  faHeart = faHeart;
  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoriteService.getUserFavorites().subscribe((favorites: any) => {
      this.favoriteProperties = favorites;
    });
  }
  toggleFavorite(propertyId: number) {
   
      this.favoriteService.removeFromFavorites(propertyId).subscribe(() => {
        //this.favoriteProperties = this.favoriteProperties.filter(property => property.id !== propertyId);
        this.loadFavorites();

      });
    
  }

}
