import { Component, HostListener } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SearchComponent,NgClass],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  categories: any[] = [];
  constructor(
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.data;
      console.log(this.categories);
      
    });
  }

  isVisibleRooms: boolean[] = [false, false, false];  // Initialize for 3 rooms
  isVisibleService: boolean[] = [false, false, false, false, false, false]; // Initialize for 6 services

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkVisibility('rooms');
    this.checkVisibility('services');
  }

  checkVisibility(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      const { top, bottom } = section.getBoundingClientRect();
      const isVisible = top < window.innerHeight && bottom > 0;


      if (sectionId === 'rooms') {
        const roomItems = section.getElementsByClassName('room-item');
        for (let i = 0; i < roomItems.length; i++) {
          const itemTop = roomItems[i].getBoundingClientRect().top;
          const itemBottom = roomItems[i].getBoundingClientRect().bottom;
          this.isVisibleRooms[i] = itemTop < window.innerHeight && itemBottom > 0;
        }
      } else if (sectionId === 'services') {
        const serviceItems = section.getElementsByClassName('service-item');
        for (let i = 0; i < serviceItems.length; i++) {
          const itemTop = serviceItems[i].getBoundingClientRect().top;
          const itemBottom = serviceItems[i].getBoundingClientRect().bottom;
          this.isVisibleService[i] = itemTop < window.innerHeight && itemBottom > 0;
        }
      }
    }
  }}