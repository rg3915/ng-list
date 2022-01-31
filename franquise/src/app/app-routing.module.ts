import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListItemComponent } from './list-item/list-item.component';


const routes: Routes = [
  {
    path: 'list-item',
    redirectTo: 'list-item',
    pathMatch: 'full'
  },
  {
    path: "list-item",
    component: ListItemComponent
  }, 
  
  {
    path: "list-item/:id",
    component: ListItemComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
