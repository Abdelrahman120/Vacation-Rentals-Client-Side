import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RequestServiceService } from '../services/request-service.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  constructor(private serviceRequest: RequestServiceService) {}
  cards: any[] = [];

  ngOnInit(): void {
    this.serviceRequest.getProperties().subscribe((data: any) => {
      this.cards = data.data;
    });
  }
}
