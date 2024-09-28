import { Routes } from '@angular/router';
import { PropertiesComponent } from './properties/properties.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

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
    }
];
