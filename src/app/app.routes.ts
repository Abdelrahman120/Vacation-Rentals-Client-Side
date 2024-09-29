import { Routes } from '@angular/router';
import { CardListComponent } from './property/list-property/card-list.component';
import { ViewPropertyComponent } from './property/view-property/view-property.component';
import { UpdatePropertyComponent } from './property/update-property/update-property.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertiesComponent } from './properties/properties.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [

    {
        path: "property-details/:id",
        component: ViewPropertyComponent,
        title: "property details",
    },
    {
        path: "properties",
        component: CardListComponent,
        title: "Properties",
    },
    {
        path: "update-property/:id",
        component: UpdatePropertyComponent,
        title: "Update Property"
    },
    {
        path: "add-property",
        component: AddPropertyComponent,
        title: "Add new property"
    },
    {
        path: 'login',
        component: LoginComponent

    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'properties',
        component: PropertiesComponent
    },
    {
        path: 'register/user',
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
