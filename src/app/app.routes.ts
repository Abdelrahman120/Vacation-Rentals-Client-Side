import { Routes } from '@angular/router';
import { CardListComponent } from './property/list-property/card-list.component';
import { ViewPropertyComponent } from './property/view-property/view-property.component';
import { UpdatePropertyComponent } from './property/update-property/update-property.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';

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
    }
];
