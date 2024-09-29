import { Routes } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
 
    {
        path:'register/user',
        component: RegisterUserComponent
    },
    {
        path: 'login',
        component: LoginUserComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }

];
