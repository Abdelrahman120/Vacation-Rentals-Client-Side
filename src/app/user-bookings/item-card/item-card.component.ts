import { Component, Input, OnInit } from '@angular/core';
import { Booking, Payment, UserInfo } from '../../user-info';
import { CommonModule, DatePipe } from '@angular/common';
import { Property } from '../../user-info';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [DatePipe, CommonModule, TruncatePipe],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css'],
})
export class ItemCardComponent implements OnInit {
  @Input() userInfo!: UserInfo;
  @Input() property!: Property;
  @Input() payment!: Payment;

  constructor() {}

  ngOnInit(): void {
    console.log('Payment:', this.payment);
    console.log('Property:', this.property);
    console.log('UserInfo:', this.userInfo);
  }
}
