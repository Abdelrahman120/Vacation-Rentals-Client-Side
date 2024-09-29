import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

export const routes: Routes = [
    // {
    //     // path: "search-result/:",
    // }
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
