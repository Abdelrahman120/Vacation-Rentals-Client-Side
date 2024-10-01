import { Component } from '@angular/core';
import { PropertyService } from '../../services/propertyService/property.service';
import { CardItemComponent } from "../property-card/card-item.component";
import { SearchComponent } from "../../search/search.component";

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardItemComponent, SearchComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {
  constructor(private PropertyService: PropertyService) { }
  properties: any[] = [];
  ngOnInit(): void {
    this.PropertyService.getProperty().subscribe((data: any) => {
      console.log(data.data);
      this.properties = data.data;
    })
  }
}
