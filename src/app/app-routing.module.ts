import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './modules/product-list/product-list.component';
import { ProductDetailComponent } from './modules/product-detail/product-detail.component';

const routes: Routes = [
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-detail/:sku', component: ProductDetailComponent },
  { path: '', redirectTo: '/product-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
