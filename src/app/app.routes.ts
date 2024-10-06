import { Routes } from '@angular/router';
import { CardListComponent } from './property/list-property/card-list.component';
import { ViewPropertyComponent } from './property/view-property/view-property.component';
import { UpdatePropertyComponent } from './property/update-property/update-property.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertiesComponent } from './properties/properties.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { MasterComponent } from './master/master.component';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
import { EditOwnerProfileComponent } from './edit-owner-profile/edit-owner-profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { UsersComponent } from './Admin/users/users.component';
import { OwnersComponent } from './Admin/owners/owners.component';
import { ShowPropertiesComponent } from './Admin/show-properties/show-properties.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordUserComponent } from './forget-password-user/forget-password-user.component';
import { ResetPasswordUserComponent } from './reset-password-user/reset-password-user.component';
import { TestBed } from '@angular/core/testing';
import { TestComponent } from './test/test.component';
import { AuthGuard } from './guards/auth.guard';
import { PaymentComponent } from './payment/payment/payment.component';
import { SuccessComponent } from './payment/success/success.component';
import { CancleComponent } from './payment/cancle/cancle.component';
import { userGuard } from './guards/user.guard';
import { FavoritesComponent } from './favorites/favorites.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { Path } from 'leaflet';
import { OwnerInfoComponent } from './owner-info/owner-info.component';

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
  },
  {
    path: 'add-property',
    component: AddPropertyComponent,
    title: 'Add new property',
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
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
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
  },
  {
    path: 'edit-category/:id',
    component: EditCategoryComponent,
    title: 'Edit Category',
  },
  {
    path: 'edit-Owner-profile/:id',
    component: EditOwnerProfileComponent,
    title: 'Edit Profile',
  },
  {
    path: 'edit-user-profile/:id',
    component: EditUserProfileComponent,
    title: 'Edit Profile',
  },
  {
    path: 'owner-dashboard',
    component: OwnerDashboardComponent,
    title: 'Dashboard',
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
  // {
  //   path : 'admin/properties',
  //   component: ShowPropertiesComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'test/:id',
    component: TestComponent,
    title: 'test',
  },
  {
    path: 'forget_password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'forget_password_user',
    component: ForgetPasswordUserComponent,
  },
  { path: 'password-reset/owners/:token', component: ResetPasswordComponent },
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
    path: 'favorite',
    component: FavoritesComponent
  },
  {
    path : 'user/info', 
    component: UserInfoComponent
  },
  {
    path: 'owner/info',
    component: OwnerInfoComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found',
  },
  
];
