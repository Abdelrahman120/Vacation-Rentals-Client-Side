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
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { MasterComponent } from './master/master.component';

export const routes: Routes = [
    {
      path: "",
      component:MasterComponent,
      title: "Home",
    },
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
        path: 'login/owner',
        component: LoginComponent,
        title: "Login"
    },
    {
        path: 'register/owner',
        component: RegisterComponent,
        title: "Register"
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
    },
    {
        path: 'category',
        component: CategoryComponent
    },
    {
        path: 'add_category',
        component: AddCategoryComponent
    },
    {
        path: 'edit_category/:id',
        component: EditCategoryComponent
    }
];
