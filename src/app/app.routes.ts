import { Routes } from '@angular/router';
import { CardListComponent } from './property/list-property/card-list.component';
import { ViewPropertyComponent } from './property/view-property/view-property.component';
import { UpdatePropertyComponent } from './property/update-property/update-property.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertiesComponent } from './properties/properties.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { MasterComponent } from './master/master.component';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { EditOwnerProfileComponent } from './edit-owner-profile/edit-owner-profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { UsersComponent } from './Admin/users/users.component';
import { OwnersComponent } from './Admin/owners/owners.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordUserComponent } from './forget-password-user/forget-password-user.component';
import { ResetPasswordUserComponent } from './reset-password-user/reset-password-user.component';
import { AuthGuard } from './guards/auth.guard';
import { PaymentComponent } from './payment/payment/payment.component';
import { SuccessComponent } from './payment/success/success.component';
import { CancleComponent } from './payment/cancle/cancle.component';
import { userGuard } from './guards/user.guard';
import { FavoritesComponent } from './favorites/favorites.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { OwnerInfoComponent } from './owner-info/owner-info.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ownerGuardGuard } from './guards/owner-guard.guard';
import { AdminPropertyDetailsComponent } from './admin-property-details/admin-property-details.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyPropertiesComponent } from './property/my-properties/my-properties.component';
import { PropertyBookingDetailsComponent } from './property/property-booking-details/property-booking-details.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { ChatComponent } from './user-bookings/chat/chat.component';
import { MyPropertyDetailsComponent } from './property/my-property-details/my-property-details.component';
import { Calendar } from '@fullcalendar/core/index.js';
import { CalendarComponent } from './property/calendar/calendar.component';
import { TestimonialComponent } from './Admin/testimonial/testimonial.component';

export const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    title: 'Home',
  },
  {
    path: 'property-details/:id',
    component: ViewPropertyComponent,
    title: 'property details',
  },
  {
    path: 'properties',
    component: CardListComponent,
    title: 'Properties',
  },
  {
    path: 'update-property/:id',
    component: UpdatePropertyComponent,
    title: 'Update Property',
    canActivate: [ownerGuardGuard],
  },
  {
    path: 'calendar/:id',
    component: CalendarComponent,
    title: 'Property Calendar',
    canActivate: [ownerGuardGuard],
  },
  {
    path: 'add-property',
    component: AddPropertyComponent,
    title: 'Add new property',
    canActivate: [ownerGuardGuard],
  },
  {
    path: 'login/owner',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'register/owner',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'admin/properties',
    component: PropertiesComponent,
    title: 'Properties',
    canActivate: [AuthGuard],
  },
  {
    path: 'register/user',
    component: RegisterUserComponent,
  },
  {
    path: 'login',
    component: LoginUserComponent,
    title: 'Login',
  },
  {
    path: 'category',
    component: CategoryComponent,
    title: 'Category',
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
    title: 'Add Category',
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-category/:id',
    component: EditCategoryComponent,
    title: 'Edit Category',
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-Owner-profile/:id',
    component: EditOwnerProfileComponent,
    title: 'Edit Profile',
    canActivate: [ownerGuardGuard],
  },
  {
    path: 'edit-user-profile/:id',
    component: EditUserProfileComponent,
    title: 'Edit Profile',
    canActivate: [userGuard],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    title: 'Dashboard',
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/owners',
    component: OwnersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'forget_password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'forget_password_user',
    component: ForgetPasswordUserComponent,
  },
  {
    path: 'password-reset/owners/:token',
    component: ResetPasswordComponent,
  },
  {
    path: 'password-reset/users/:token',
    component: ResetPasswordUserComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [userGuard],
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path: 'cancel',
    component: CancleComponent,
  },
  {
    path: 'user/payments',
    component: UserProfileComponent,
  },
  {
    path: 'favorite',
    component: FavoritesComponent,
    canActivate: [userGuard],
  },
  {
    path: 'user/info',
    component: UserInfoComponent,
    canActivate: [userGuard],
  },
  {
    path: 'owner/info',
    component: OwnerInfoComponent,
    canActivate: [ownerGuardGuard],
  },
  {
    path: 'user/:id',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/details/:id',
    component: AdminPropertyDetailsComponent,
  },
  {
    path: 'send-email/:id',
    component: SendEmailComponent,
  },
  {
    path: 'admin/owner/:id',
    component: OwnerDetailsComponent,
  },
  {
    path: 'owner/update-property/:id',
    component: UpdatePropertyComponent,
    title: 'Update Property',
  },
  {
    path: 'my-properties',
    component: MyPropertiesComponent,
    title: 'My Properties',
  },
  {
    path: 'my-property-booking-details/:id',
    component: PropertyBookingDetailsComponent,
    title: 'Booking Details',
  },
  {
    path: 'bookings',
    component: UserBookingsComponent,
    title: 'Bookings',
  },
  {
    path: 'bookings/chat/:propId/:ownerId/:bookingId',
    component: ChatComponent,
  },
  {
    path: 'contact',
    component: TestimonialComponent,
    title: 'Contact Us',
  },
  {
    path: 'admin/testimonials',
    component: TestimonialComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found',
  },
];
