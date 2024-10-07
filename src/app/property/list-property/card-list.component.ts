import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../Services/propertyService/property.service';
import { CardItemComponent } from "../property-card/card-item.component";
import { SearchComponent } from "../../search/search.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardItemComponent, SearchComponent],

  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'] // Note: 'styleUrls' should be plural
})
export class CardListComponent implements OnInit {
  properties: any;
  city: any;
  input: any;
  objLength: string[] = [];
  images: object[] = [];

  constructor(
    private propertyService: PropertyService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.input = {
        startDate: params['start_date'],
        endDate: params['end_date'],
        destination: params["city"],
        sleeps: params["sleeps"]
      };

      if (this.input.destination && this.input.startDate && this.input.endDate) {
        this.propertyService.getPropertyByDate(this.input).subscribe((res: any) => {
          this.properties = res.data;
          console.log(res.data);
        });
      }
      else if (!this.input.destination && !this.input.startDate && !this.input.endDate) {
        this.propertyService.getProperties().subscribe((res: any) => {
          this.properties = res.data;
          console.log(this.properties[0]['images'][0].image);
        });
      }
    });
  }

  objectLength() {
    this.objLength = Object.keys(this.properties);
    if (this.objLength.length > 0) {
      return true;
    }
    return false;
  }
}
