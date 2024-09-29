import { Routes } from '@angular/router';
import { PropertiesComponent } from './properties/properties.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
 
    {
        path: 'login',
        component:LoginComponent
    
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'properties',
        component:PropertiesComponent
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
