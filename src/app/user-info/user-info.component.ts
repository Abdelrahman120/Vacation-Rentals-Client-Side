import { Component, OnInit } from '@angular/core'; 
import { UserInfoService } from '../service/user-info.service';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../user-info'; 

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  
  userPayments: UserInfo['data']['payments'] = [];
  userDetails: UserInfo['data'] | null = null; 

  constructor(private userInfo: UserInfoService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    const token = localStorage.getItem('token'); 
    if (token) {
      this.userInfo.getUserInfo(token).subscribe(
        (response: UserInfo) => {
          this.userPayments = response.data.payments; 
          this.userDetails = response.data; 
          console.log(this.userPayments); 
          console.log(this.userDetails); 
        },
        error => {
          console.error('Error fetching payments', error);
        }
      );
    }
  }
}
