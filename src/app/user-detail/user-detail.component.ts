import { Component } from '@angular/core';
import { UserDetailsService } from '../services/user-details.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent {
  user: any;
  loading: boolean = true;

  constructor(
    private userService: UserDetailsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUserDetails(userId);
  }

  getUserDetails(id: number): void {
    this.userService.getUserById(id).subscribe(
      (response) => {
        this.user = response.data;
        console.log(response);

        this.loading = false;
      },
      (error) => {
        console.error('Error fetching user details:', error);
        this.loading = false;
      }
    );
  }
}
