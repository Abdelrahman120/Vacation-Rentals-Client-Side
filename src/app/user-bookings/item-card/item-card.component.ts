import { Component, Input, OnInit } from '@angular/core';
import { Booking, Payment, UserInfo } from '../../user-info';
import { CommonModule, DatePipe } from '@angular/common';
import { Property } from '../../user-info';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [DatePipe, CommonModule, TruncatePipe, RouterLink],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css'],
})
export class ItemCardComponent implements OnInit {
  @Input() userInfo!: UserInfo;
  @Input() property!: Property;
  @Input() payment!: Payment;
  @Input() hostInfo: any;
  @Input() booking: any;
  userId: string | null = null;
  start_date: Date = new Date();
  end_date: Date = new Date();
  diffInDays: any;
  phone: string = '';
  email: string = '';

  constructor() {}

  ngOnInit(): void {
    console.log('Host info:', this.hostInfo);

    if (this.hostInfo && this.hostInfo.data) {
      this.phone = this.hostInfo.data.phone;
      this.email = this.hostInfo.data.email;
    }
  }
}
