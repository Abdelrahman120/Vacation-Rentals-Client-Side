import { Component } from '@angular/core';
import { PropertyService } from '../Services/propertyService/property.service';
import { CardItemComponent } from "../property/property-card/card-item.component";
declare var $: any;

@Component({
  selector: 'app-recommendation',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.css'
})
export class RecommendationComponent {

  properties: any[] = [];
  constructor(protected propertyservice: PropertyService ) {

  }

  ngOnInit(): void {
    this.propertyservice.getProperties().subscribe((data: any) => {
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
}
