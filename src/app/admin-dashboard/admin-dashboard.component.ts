import { ChangeDetectorRef, Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Router, RouterLink } from '@angular/router';
import { LoginUserService } from '../services/login-user.service';
import { CategoryService } from '../services/category.service';
import { AdminServices } from '../services/admin-services.service';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { NotificationsService } from '../services/notifications.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RefreshServicesService } from '../services/refresh-services.service';
// // import * as $ from 'jquery';
// declare var $: any;
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SidebarComponent, RouterLink, TruncatePipe , CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  constructor(
    private authService: LoginUserService,
    private router: Router,
    private categoryService: CategoryService,
    private adminServices: AdminServices,
    private notificationService: NotificationsService,
    private refreshServices : RefreshServicesService,
    private cd: ChangeDetectorRef
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
  notificationCount: any = 0;
  private intervalId: any;
  notifications: any[] = [];

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
    this.loadNotifications();
  //   this.refreshServices.refreshRequireds.pipe(take(1)).subscribe((refresh) => {
  //     console.log('Subscription triggered with refresh value:', refresh);
  //     if (refresh) {
  //         this.refreshDivContent();
  //     }
  // });
  // this.intervalId = setInterval(() => {
  //   this.loadNotifications(); 
  // }, 3000);
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
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


  loadNotifications() {
    this.notificationService.getNotifications().subscribe(data => {
      console.log('Data loaded:', data); // سجل البيانات المستلمة
      this.notifications = data;
      this.notificationCount = this.notifications.length;
      this.cd.detectChanges();
    }, error => {
      console.error('Error loading notifications:', error);
    });
  }
  
 
}
