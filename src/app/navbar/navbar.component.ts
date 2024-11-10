import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginUserService } from '../services/login-user.service';
import { CommonModule } from '@angular/common';
import { OwnerProfileService } from '../Services/owner-profile.service';
import { UserProfileService } from '../Services/user-profile.service';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, TruncatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  owner: any = {};
  user: any;
  ownerId: number | null = null;
  notificationCount: any = 0;
  private intervalId: any;
  notifications: any[] = [];
  notificationsForOwner: any[] = [];
  unreadCount: number = 0;
  unreadCountOwner: number = 0;

  constructor(
    private authService: LoginUserService,
    private router: Router,
    private ownerService: OwnerProfileService,
    private userService: UserProfileService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.loadOwnerDetails();

    if(this.isOwner()){
    this.loadNotificationsForOwner();
    this.loadNotifications();
    this.loadUnreadNotificationsCount();
    this.updateUnreadCount();
    this.loadOwnerDetails();
    }
    this.intervalId = setInterval(() => {
      if(this.isAdmin()){
      this.loadNotifications();}
      if(this.isOwner()){
      this.loadNotificationsForOwner();
      this.loadUnreadNotificationsCount();
      this.updateUnreadCount();
      }
    }, 3000);
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userData = urlParams.get('user');
    if (token) {
      localStorage.setItem('token', token);
      if (userData) {
        this.user = JSON.parse(userData);
      } else {
        this.loadUserDetails();
      }
    } 
    this.loadUserDetails();
  }




  markAsRead(notificationId: string): void {
    this.notificationService.markNotificationAsRead(notificationId).subscribe(
      () => {
        this.loadUnreadNotificationsCount(); 
      },
      (error) => {
        console.error('Error marking notification as read:', error);
      }
    );
  }





  loadNotificationsForOwner() {
    this.notificationService.getNotificationsForOwner().subscribe(
      (data) => {
        this.notificationsForOwner = data;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  loadUserDetails() {
    this.userService.getUserDetails().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.log('error loading user details:', error);
        if (error.status === 401) {
          console.log('please login first.');
        }
      }
    );
  }

  loadOwnerDetails() {
    this.ownerService.getOwnerDetails().subscribe(
      (data) => {
        this.owner = data;
        console.log(this.owner);
      }
    );
  }

  isLoggedIn(): boolean {
    return (
      !!localStorage.getItem('owner_auth_token') ||
      !!localStorage.getItem('token')
    );
  }

  isOwner(): boolean {
    return !!localStorage.getItem('owner_auth_token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  isUser(): boolean {
    return !!localStorage.getItem('token') && !this.isOwner();
  }

  onLogout(): void {
    this.authService.logout().subscribe(
      (response) => {
        console.log('Logout successful', response);
        const role = localStorage.getItem('role');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('owner_auth_token');
        localStorage.removeItem('role');
        localStorage.removeItem('ownerid');
        localStorage.removeItem('favoriteProperties');

        if (role === 'admin') {
          this.router.navigate(['/login/owner']);
        } else if (role === 'owner') {
          this.router.navigate(['/login/owner']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.log('Logout failed', error);
      }
    );
  }

  navigateToPayments(): void {
    this.router.navigate(['/user/payments']);
  }
  navigateToOwnerProfile(): void {
    this.router.navigate(['owner/info']);
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe(
      (data) => {
        this.notifications = data;
        this.notificationCount = this.notifications.length;
      },
      (error) => {
        console.error('Error loading notifications:', error);
      }
    );
  }

  onNotificationClick(notification: any, event: Event) {
    event.preventDefault();

    this.notificationService.markNotificationAsRead(notification.id).subscribe(
      () => {
        // After marking as read, navigate based on the notification type
        if (notification.type === 'App\\Notifications\\NewOwnerRegister') {
          const ownerid = notification.data.user_id;
          this.router.navigate([`/admin/owner/${ownerid}`]);
        } else if (notification.type === 'App\\Notifications\\UserRegistered') {
          const ownerid = notification.data.user_id;
          this.router.navigate([`/user/${ownerid}`]);
        }
      },
      (error) => {
        console.error('Error marking notification as read:', error);
      }
    );
  }


  getNotificationLink(notification: any): string {
    if (notification.data.type === 'owner') {
      return '/owner/' + notification.data.user_id; 
    } else if (notification.data.type === 'user') {
      return '/user/' + notification.data.user_id; 
    }
    return '/'; 
  }
  

  loadUnreadNotificationsCount(): void {
    this.notificationService.getUnreadNotificationsCount().subscribe(
      (response) => {
        this.unreadCount = response.unreadCount;
        console.log(this.unreadCount);
        
      },
      (error) => {
        console.error('Error loading unread notifications count:', error);
      }
    );
  }


  // for owner notifications 
  updateUnreadCount(): void {
    this.notificationService.getOwnerUnreadNotificationsCount().subscribe(
      (response) => {
        this.unreadCountOwner = response.unreadCount;
      },
      (error) => {
        console.error('Error fetching unread notifications count:', error);
      }
    );
  }

  // markNotificationAsRead(notificationId: string): void {
  //   this.notificationService.markOwnerNotificationAsRead(notificationId).subscribe(
  //     (response) => {
  //       if (response.success) {
  //         console.log(`Notification ${notificationId} marked as read`);
  //         this.updateUnreadCount(); // Refresh the count
          
  //       } else {
  //         console.error('Failed to mark notification as read');
  //       }
  //     },
  //     (error) => {
  //       console.error('Failed to mark notification as read:', error);
  //     }
  //   );
  // }

  markAndNavigate(notificationId: string, propertyId: string, event: Event): void {
    event.preventDefault(); // Prevents the default navigation behavior

    // Mark the notification as read
    this.notificationService.markOwnerNotificationAsRead(notificationId).subscribe(
      (response) => {
        if (response.success) {
          this.updateUnreadCount(); // Refresh the count
          // Navigate to the specified route after marking as read
          this.router.navigate([`/my-property-booking-details/${propertyId}`]);
        } else {
          console.error('Failed to mark notification as read');
        }
      },
      (error) => {
        console.error('Failed to mark notification as read:', error);
      }
    );
  }


  // end for owner notifications 
}
