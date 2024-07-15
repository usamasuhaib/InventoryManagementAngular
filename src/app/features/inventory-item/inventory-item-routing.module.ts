import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { InventoryCreateComponent } from './inventory-create/inventory-create.component';

const routes: Routes = [

  { path: '', component: InventoryListComponent }, // Default path for inventory
  { path: 'list', component: InventoryListComponent },
  { path: 'details/:id', component: InventoryDetailsComponent },
  { path: 'create', component: InventoryCreateComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryItemRoutingModule { }
