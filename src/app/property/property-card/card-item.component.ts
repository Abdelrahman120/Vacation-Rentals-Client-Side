import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faBath,
  faBed,
  faHouse,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FavoriteService } from '../../Services/favorite.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { UserInfoService } from '../../service/user-info.service';
import { UserInfo } from '../../user-info';

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
    private favoriteService: FavoriteService,
    private userInfoService: UserInfoService

  ) {}
  userDetails: UserInfo['data'] | null = null;

  @Input() property: any;
  faHeart = faHeart;
  faBed = faBed;
  faBath = faBath;
  faHouse = faHouse;
  favoriteProperties: number[] = [];
  isFavorite: boolean = false;

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
    const token = localStorage.getItem('token');
    if (token) {
      this.getUserInfo(token);
    }
  }
  getUserInfo(token: string): void {
    this.userInfoService.getUserInfo(token).subscribe(
      (response) => {
        this.userDetails = response.data;
        console.log('User Details:', this.userDetails.id);
      },
      (error) => {
        console.error('Error fetching user info:', error);
      }
    );
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
    let favorites = JSON.parse(
      localStorage.getItem('favoriteProperties') || '[]'
    );
    if (favorites.includes(id)) {
      favorites = favorites.filter((favId: number) => favId !== id);
      this.isFavorite = false;
    } else {
      favorites.push(id);
      this.isFavorite = true;
    }

    localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
    this.favoriteService.toggleFavorite(id).subscribe(() => {});
  }
  checkIfFavorite() {
    const productId = this.property.id;
    const favorites = JSON.parse(
      localStorage.getItem('favoriteProperties') || '[]'
    );

    this.isFavorite = favorites.includes(productId);
  }
  isOfferActive(): boolean {
    const today = new Date();
    const startDate = new Date(this.property.offer_start_date);
    const endDate = new Date(this.property.offer_end_date);
    return today >= startDate && today <= endDate;
  }
}
