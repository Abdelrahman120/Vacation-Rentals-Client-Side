import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RequestServiceService } from '../Services/request-service.service';
import { RouterLink } from '@angular/router';

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
