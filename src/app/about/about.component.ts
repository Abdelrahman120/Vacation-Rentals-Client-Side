import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  isVisible = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const section = document.getElementById('aboutUs');
    if (section) {
      const { top, bottom } = section.getBoundingClientRect();
      const isVisible = top < window.innerHeight && bottom > 0;
      this.isVisible = isVisible;
    }
  }
}