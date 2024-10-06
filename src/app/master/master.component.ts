import { Component } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { AboutComponent } from "../about/about.component";
import { FooterComponent } from "../footer/footer.component";
import { ListComponent } from "../list/list.component";
import { RecommendationComponent } from "../recommendation/recommendation.component";

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [HeroComponent, AboutComponent, FooterComponent, ListComponent, RecommendationComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {

}
