import { Component } from '@angular/core';
import { PropertyService } from '../service/property.service';
import { CardItemComponent } from "../card-item/card-item.component";
import { SearchInputComponent } from "../search-input/search-input.component";

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardItemComponent, SearchInputComponent],
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
