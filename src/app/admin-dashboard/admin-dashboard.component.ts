import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Router, RouterLink } from '@angular/router';
import { LoginUserService } from '../services/login-user.service';
import { CategoryService } from '../services/category.service';
import { AdminServices } from '../services/admin-services.service';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SidebarComponent, RouterLink, TruncatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  constructor(
    private authService: LoginUserService,
    private router: Router,
    private categoryService: CategoryService,
    private adminServices: AdminServices
  ) {}

  categories: any[] = [];
  nofcat: number = 0;
  owners: any[] = [];
  nofowr: number = 0;
  properties: any[] = [];
  users: any[] = [];
  nofuse: number = 0;
  nofpro: number = 0;
  payments: any[] = [];
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.data;
      this.nofcat = this.categories.length;
      this.adminServices.getOwners().subscribe((data: any) => {
        this.owners = data.data;
        this.nofowr = this.owners.length;
        this.adminServices.getProperties().subscribe((data: any) => {
          this.properties = data.data;
          this.nofpro = this.properties.length;
          this.adminServices.getUsers().subscribe((data: any) => {
            this.users = data.data;
            this.nofuse = this.users.length;
            this.adminServices.getPayments().subscribe((data: any) => {
              console.log(data);

              this.payments = data.data;
            });
          });
        });
      });
    });
  }
  onOwnerLogout() {
    this.authService.logout().subscribe(
      (response) => {
        console.log('Owner Logout successful', response);
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('owner_auth_token');
        localStorage.removeItem('role');
        this.router.navigate(['/login/owner']);
      },
      (error) => {
        console.log('Owner Logout failed', error);
      }
    );
  }
}
