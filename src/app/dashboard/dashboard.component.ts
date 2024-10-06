import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginUserService } from '../services/login-user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  id: number = 0;

  constructor(private authService: LoginUserService, private router: Router) {
    this.loadUserId();
  }

  private loadUserId(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.id = +userId;
    }
  }

  onLogout(): void {
    this.authService.logoutUser().subscribe(
      (response) => {
        console.log('Logout successful', response);
        this.clearLocalStorage();
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Logout failed', error);
      }
    );
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('owner_auth_token');
    localStorage.removeItem('user_role');
  }
}
