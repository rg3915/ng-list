import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { ListItemComponent } from './list-item/list-item.component';

const routes: Routes = [
        {
                path: 'add-item',
                redirectTo: 'add-item',
                pathMatch: 'full'
        },
        {
                path: "add-item",
                component: AddItemComponent
        },

        {
                path: "add-item/:id",
                component: AddItemComponent
        },
        {
                path: "list-item",
                component: ListItemComponent
        },

];

@NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
})
export class AppRoutingModule { }
