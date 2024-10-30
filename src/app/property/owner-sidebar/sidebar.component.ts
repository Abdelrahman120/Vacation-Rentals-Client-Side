import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

@Component({
  selector: 'app-owner-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class OwnerSidebarComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  propertyId: string | null = null;
  ngOnInit() {
    this.propertyId = this.route.snapshot.paramMap.get('id');
  }
}
