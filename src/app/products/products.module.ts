import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductInsertComponent } from './product-insert/product-insert.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';

import { ProductService } from './product.service';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductUpdateFormComponent } from './product-update-form/product-update-form.component';


const routes: Routes = [
  {path: `list`, component: ProductListComponent},
  {path: `insert`, component: ProductInsertComponent},
  {path: `delete`, component: ProductDeleteComponent},
  {path: `update`, component: ProductUpdateComponent},
  {path: `updateForm`, component: ProductUpdateFormComponent},
  
]


@NgModule({
  declarations: [
    ProductListComponent,
    ProductInsertComponent,
    ProductDeleteComponent,
    ProductUpdateComponent,
    ProductUpdateFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProductService]
})
export class ProductsModule { }