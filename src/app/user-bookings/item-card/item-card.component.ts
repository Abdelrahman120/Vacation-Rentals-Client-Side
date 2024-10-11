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
  start_date: Date = new Date();
  end_date: Date = new Date();
  diffInDays: any;

  constructor() {}

  ngOnInit(): void {
    this.start_date = new Date(this.payment.start_date);
    this.end_date = new Date(this.payment.end_date);
    let diffInHours = this.end_date.getTime() - this.start_date.getTime();
    this.diffInDays = Math.ceil(diffInHours / (1000 * 60 * 60 * 24));
    console.log('Payment:', this.payment);
    console.log('Property:', this.property);
    console.log('UserInfo:', this.userInfo);
  }
}
