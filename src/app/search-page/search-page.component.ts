import { Component } from '@angular/core';
import { FiltrationComponent } from "../filtration/filtration.component";
import { CardListComponent } from "../property/list-property/card-list.component";
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [FiltrationComponent, CardListComponent, SearchComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

}
