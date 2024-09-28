import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { HeroComponent } from "./hero/hero.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AddPropertyComponent } from "./add-property/add-property.component";
import { EditPropertyComponent } from "./edit-property/edit-property.component";
import { NotAuthorizedComponent } from "./not-authorized/not-authorized.component";
import { PropertiesComponent } from "./properties/properties.component";
import { CategoryComponent } from "./category/category.component";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { EditCategoryComponent } from "./edit-category/edit-category.component";
import { ListComponent } from './list/list.component';
import { AboutComponent } from './about/about.component';
import { RecommendationComponent } from './recommendation/recommendation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, HeroComponent, LoginComponent, RegisterComponent, AddPropertyComponent, EditPropertyComponent, NotAuthorizedComponent, PropertiesComponent, CategoryComponent, AddCategoryComponent, EditCategoryComponent, ListComponent, AboutComponent, RecommendationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Vacation-Rentals';
}
